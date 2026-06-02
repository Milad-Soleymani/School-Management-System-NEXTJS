"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { SubjectSchema } from "./formValidationSchema";

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
          connect:
            data.teachers?.map((id: any) => ({ id: parseInt(id) })) || [],
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
          set: data.teachers?.map((id: any) => ({ id: parseInt(id) })) || [],
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
