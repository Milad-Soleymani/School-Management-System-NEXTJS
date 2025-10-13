"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { SubjectSchema } from "./formValidationSchema";
import { success } from "zod";

type CurrentState = {success: Boolean, error:boolean}

export const createSubject = async (CurrentState: CurrentState,data: SubjectSchema) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating subject:", err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (CurrentState: CurrentState,data: SubjectSchema) => {
  try {
    await prisma.subject.update({
      where:{
        id: data.id
      },
      data: {
        name: data.name,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating subject:", err);
    return { success: false, error: true };
  }
};

