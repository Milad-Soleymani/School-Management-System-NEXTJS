import { z } from "zod";

export const subjectSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "نام ماده درسی الزامی است" }),
  teachers: z.array(z.string()),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "نام کلاس الزامی است" }),
  capacity: z.coerce.number().min(1, "ظرفیت کلاس الزامی است"),
  gradeId: z.coerce.number().min(1, "نام پایه الزامی است"),
  supervisorId: z.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "!نام کاربری باید حداقل ۳ کاراکتر باشد" })
    .max(20, { message: "!نام کاربری باید حداکثر ۲۰ کاراکتر باشد" }),
  password: z
    .string()
    .min(8, { message: "!رمز عبور باید حداقل ۸ کاراکتر باشد" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(3, { message: "!نام کوچک الزامی است" }),
  surname: z.string().min(3, { message: "!نام خانوادگی الزامی است" }),
  email: z
    .string()
    .email({ message: "!آدرس ایمیل نامعتبر است" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional().nullable(),
  bloodType: z.string().min(1, { message: "!گروه خونی الزامی است" }),
  birthday: z.string().min(1, "تاریخ تولد الزامی است"),
  sex: z.enum(["MALE", "FEMALE"], { message: "!جنسیت الزامی است" }),
  subjects: z.array(z.string()).optional(), //subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "!نام کاربری باید حداقل ۳ کاراکتر باشد" })
    .max(20, { message: "!نام کاربری باید حداکثر ۲۰ کاراکتر باشد" }),
  password: z
    .string()
    .min(8, { message: "!رمز عبور باید حداقل ۸ کاراکتر باشد" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(3, { message: "!نام کوچک الزامی است" }),
  surname: z.string().min(3, { message: "!نام خانوادگی الزامی است" }),
  email: z
    .string()
    .email({ message: "!آدرس ایمیل نامعتبر است" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional().nullable(),
  bloodType: z.string().min(1, { message: "!گروه خونی الزامی است" }),
  birthday: z.string().min(1, "تاریخ تولد الزامی است"),
  sex: z.enum(["MALE", "FEMALE"], { message: "!جنسیت الزامی است" }),
  gradeId: z.coerce.number().min(1,{message: "!پایه الزامی است"}),
  classId: z.coerce.number().min(1,{message: "!کلاس الزامی است"}),
  parentId: z.string().min(1,{message: "!والدین الزامی است"})
});


export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "نام ماده درسی الزامی است" }),
  startTime: z.coerce.date({message:"!زمان شروع الزامی است"}),
  endTime: z.coerce.date({message:"!زمان پایان الزامی است"}),
  lessonId: z.number({message:"!درس الزامی است"}),
});

export type ExamSchema = z.infer<typeof examSchema>;
