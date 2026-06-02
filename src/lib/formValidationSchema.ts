import { z } from "zod";

export const subjectSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "نام ماده درسی الزامی است" }),
  teachers: z.array(z.string()).optional(),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;