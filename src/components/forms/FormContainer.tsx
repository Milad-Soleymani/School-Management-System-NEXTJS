import prisma from "@/lib/prisma";
import FormModal from "../FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";
  type: "create" | "update" | "delete";
  data?: unknown;
  id?: string | number;
  relatedData?: any;
};

const FormContainer = async ({
  table,
  type,
  data,
  id,
}: FormContainerProps) => {
  let relatedData = {};



  if (type !== "delete") {
    switch (table) {
      case "subject": {
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      }

      case "class": {
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });

        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });

        relatedData = {
          teachers: classTeachers,
          grades: classGrades,
        };
        break;
      }

      case "teacher": {
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });

        relatedData = { subjects: teacherSubjects };
        break;
      }
      case "student": {
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentclasses = await prisma.class.findMany({
          include: {
            _count: {
              select: {
                students: true
              }
            }
          }
        });

        relatedData = { classes: studentclasses, grades: studentGrades };
        break;
      }
      case "exam": {
        const { userId, sessionClaims } = await auth();


        const role = (
          sessionClaims?.metadata as {
            role?: "admin" | "teacher" | "student" | "parent";
          }
        )?.role;

        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role == "teacher" ? { teacherId: userId! } : {})
          }, select: {
            id: true, name: true
          }

        });
        relatedData = { lessons: examLessons };
        break;
      }
      case "assignment": {
        const { userId, sessionClaims } = await auth();
        const role = (
          sessionClaims?.metadata as {
            role?: "admin" | "teacher" | "student" | "parent";
          }
        )?.role;

        const assignmentLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: userId! } : {}),
          },
          select: {
            id: true,
            name: true,
          },
        });

        relatedData = { lessons: assignmentLessons };

        break;
      }
      case "event": {
        const classes = await prisma.class.findMany({
          select: {
            id: true,
            name: true,
          },
        });

        relatedData = { classes };
        break;
      }
      default:
        break;
    }
  };

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;