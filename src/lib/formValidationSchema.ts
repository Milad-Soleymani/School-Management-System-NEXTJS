import { z } from "zod";

export const subjectSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "نام ماده درسی الزامی است" }),
  teachers: z.array(z.string()).optional(),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;


export const classSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "نام کلاس الزامی است" }),
  capacity: z.coerce.number().min(1, ("ظرفیت کلاس الزامی است")),
  gradeId: z.coerce.number().min(1, ("نام پایه الزامی است")),
  supervisorId: z.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;