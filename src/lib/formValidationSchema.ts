import z from "zod";

// تعریف اسکیمای اعتبارسنجی با Zod
export const subjectSchema = z.object({
  name: z.string()
    .min(1, { message: 'نام کاربری الزامی است' })
})
export type SubjectSchema = z.infer<typeof subjectSchema>;
