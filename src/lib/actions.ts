"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { SubjectSchema } from "./formValidationSchema";

export const createSubject = async (data: SubjectSchema) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      },
    });

     revalidatePath("/list/subjects");
  } catch (err) {
    console.error("Error creating subject:", err);
    throw err;
  }
};
