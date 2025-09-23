import { z } from "zod";

// تعریف اسکیمای اعتبارسنجی با Zod
export const subjectSchema = z.object({
  name: z.string().min(1, { message: 'نام کاربری الزامی است' }),
});

// تایپ ورودی استخراج شده از اسکیمای بالا
export type SubjectSchema = z.infer<typeof subjectSchema>;
