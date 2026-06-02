"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import {
  ClassSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchema";
import { clerkClient } from "@clerk/nextjs/server";

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

// export const updateTeacher = async (
//   currentState: { success: boolean; error: boolean },
//   data: TeacherSchema,
// ) => {
//   try {
//     await prisma.teacher.update({
//       where: { id: data.id },
//       data,
//     });
//     revalidatePath("/list/teachers");
//     return { success: true, error: false };
//   } catch (error) {
//     console.log(error);
//     return { success: false, error: true };
//   }
// };
// export const deleteTeacher = async (
//   currentState: CurrentState,
//   data: FormData,
// ) => {
//   const id = parseInt(data.get("id") as string);
//   try {
//     await prisma.teacher.delete({ where: { id } });
//     revalidatePath("/list/teachers");
//     return { success: true, error: false };
//   } catch (err) {
//     console.error("Error deleting subject:", err);
//     return { success: false, error: true };
//   }
// };
