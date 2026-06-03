"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import {
  ClassSchema,
  SubjectSchema,
  TeacherSchema,
  StudentSchema,
  ExamSchema,
  AssignmentSchema,
} from "./formValidationSchema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { success } from "zod";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers?.map((id: any) => ({ id: id })) || [],
        },
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
export const updateSubject = async (
  currentState: { success: boolean; error: boolean },
  data: SubjectSchema & { id?: number },
) => {
  try {
    await prisma.subject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers?.map((id: any) => ({ id: id })) || [],
        },
      },
    });
    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData,
) => {
  try {
    const id = parseInt(data.get("id") as string);
    await prisma.subject.delete({ where: { id } });
    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting subject:", err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema,
) => {
  try {
    const maxClass = await prisma.class.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    console.log(maxClass);
  } catch (error) {
    console.log(error);
  }
  try {
    await prisma.class.create({
      data,
    });

    revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: { success: boolean; error: boolean },
  data: ClassSchema,
) => {
  try {
    await prisma.class.update({
      where: { id: data.id },
      data,
    });
    revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
export const deleteClass = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = parseInt(data.get("id") as string);
  try {
    await prisma.class.delete({ where: { id } });
    revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting subject:", err);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema,
) => {
  try {
    const client = await clerkClient();

    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {
        role: "teacher",
      },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: new Date(data.birthday),
        subjects: {
          connect:
            data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })) || [],
        },
      },
    });

    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (error: any) {
    console.log("FULL ERROR:");
    console.dir(error, { depth: null });

    console.log("CLERK ERRORS:");
    console.log(error.errors);

    return {
      success: false,
      error: error.errors?.[0]?.message || "خطای ناشناخته",
    };
  }
};

export const updateTeacher = async (
  currentState: { success: boolean; error: boolean },
  data: TeacherSchema,
) => {
  console.log("UPDATE ACTION CALLED");
  console.log(data);
  console.log(data);
  console.log(data?.birthday);

  try {
    if (!data.id) {
      return { success: false, error: true };
    }
    const client = await clerkClient();

    const user = await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {
        role: "teacher",
      },
    });

    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: new Date(data.birthday),
        subjects: {
          connect:
            data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })) || [],
        },
      },
    });
    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    // حذف همه درس‌های این معلم
    await prisma.lesson.deleteMany({
      where: {
        teacherId: id,
      },
    });

    // حذف ارتباط معلم با درس‌ها (Many-to-Many)
    await prisma.teacher.update({
      where: { id },
      data: {
        subjects: {
          set: [],
        },
      },
    });

    // حذف خود معلم
    await prisma.teacher.delete({
      where: {
        id,
      },
    });

    revalidatePath("/list/teachers");

    return {
      success: true,
      error: false,
    };
  } catch (err) {
    console.error("خطا هنگامم حذف معلم:", err);

    return {
      success: false,
      error: true,
    };
  }
};

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema,
) => {
  try {
    const classItem = await prisma.class.findUnique({
      where: {
        id: data.classId,
      },
      include: {
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    if (classItem && classItem.capacity == classItem._count.students) {
      return { success: false, error: true };
    }

    const client = await clerkClient();

    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {
        role: "student",
      },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: new Date(data.birthday),
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (error: any) {
    console.log(error.errors);

    return {
      success: false,
      error: error.errors?.[0]?.message || "خطای ناشناخته",
    };
  }
};

export const updateStudent = async (
  currentState: { success: boolean; error: boolean },
  data: StudentSchema,
) => {
  try {
    if (!data.id) {
      return { success: false, error: true };
    }
    const client = await clerkClient();

    const user = await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {
        role: "student",
      },
    });

    await prisma.student.update({
      where: { id: data.id },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: new Date(data.birthday),
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await prisma.lesson.deleteMany({
      where: {
        teacherId: id,
      },
    });
    const client = await clerkClient();

    await client.users.deleteUser(id);

    await prisma.student.delete({
      where: {
        id,
      },
    });

    revalidatePath("/list/students");

    return {
      success: true,
      error: false,
    };
  } catch (err) {
    console.error("خطا هنگامم حذف دانش اموز:", err);

    return {
      success: false,
      error: true,
    };
  }
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema,
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId!,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }
    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
export const updateExam = async (
  currentState: { success: boolean; error: boolean },
  data: ExamSchema & { id?: number },
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId!,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.update({
      where:{
        id: data.id
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });
    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
export const deleteExam = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  try {
    const id = parseInt(data.get("id") as string);
    if (role === "teacher") {
      const exam = await prisma.exam.findFirst({
        where: {
          id,
          lesson: {
            teacherId: userId!,
          },
        },
      });

      if (!exam) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.delete({
      where: { id },
    });

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting subject:", err);
    return { success: false, error: true };
  }
};

export const createAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema,
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId!,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.assignment.create({
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema & { id?: number },
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId!,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.assignment.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteAssignment = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  try {
    const id = parseInt(data.get("id") as string);

    if (role === "teacher") {
      const assignment = await prisma.assignment.findFirst({
        where: {
          id,
          lesson: {
            teacherId: userId!,
          },
        },
      });

      if (!assignment) {
        return { success: false, error: true };
      }
    }

    await prisma.assignment.delete({
      where: { id },
    });

    revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting assignment:", err);
    return { success: false, error: true };
  }
};