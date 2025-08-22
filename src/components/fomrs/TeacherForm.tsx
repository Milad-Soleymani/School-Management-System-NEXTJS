"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";
import Image from "next/image";

// تعریف اسکیمای اعتبارسنجی با Zod
const schema = z.object({
  username: z.string()
    .min(3, { message: '!نام کاربری باید حداقل ۳ کاراکتر باشد' })
    .max(20, { message: '!نام کاربری باید حداکثر ۲۰ کاراکتر باشد' }),
  email: z.string().email({ message: "!آدرس ایمیل نامعتبر است" }),
  password: z.string().min(8, { message: '!رمز عبور باید حداقل ۸ کاراکتر باشد' }),
  firstname: z.string().min(3, { message: '!نام کوچک الزامی است' }),
  lastname: z.string().min(3, { message: '!نام خانوادگی الزامی است' }),
  phone: z.string().min(3, { message: '!شماره تلفن الزامی است' }),
  address: z.string().min(3, { message: '!آدرس الزامی است' }),
  bloodType: z.string().min(1, { message: '!گروه خونی الزامی است' }),
  birthday: z.string({ required_error: '!تاریخ تولد الزامی است' }), // اصلاح شد
  sex: z.enum(["male", "female"], { message: "!جنسیت الزامی است" }),
  img: z.instanceof(File, { message: "!عکس الزامی است" })
});

// کامپوننت فرم معلم
function TeacherForm({ type, data }: { type: 'create' | 'update'; data?: any }) {
  // استفاده از react-hook-form همراه با Zod
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // تابع ارسال فرم
  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* عنوان فرم */}
      <h1 className="text-xl font-semibold">ایجاد یک معلم جدید</h1>

      {/* بخش اطلاعات هویتی */}
      <span className="text-xs font-medium text-gray-400">اطلاعات هویتی</span>
      <div className="flex gap-4 justify-between flex-wrap flex-row-reverse">
        <InputField label="نام کاربری" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
        <InputField label="پست الکترونیک" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
        <InputField label="رمز عبور" name="password" type="password" defaultValue={data?.password} register={register} error={errors?.password} />
      </div>

      {/* بخش اطلاعات شخصی */}
      <span className="text-xs font-medium text-gray-400">اطلاعات شخصی</span>
      <div className="flex gap-4 justify-between flex-wrap flex-row-reverse">
        <InputField label="نام" name="firstname" defaultValue={data?.firstname} register={register} error={errors?.firstname} />
        <InputField label="نام خانوادگی" name="lastname" defaultValue={data?.lastname} register={register} error={errors?.lastname} />
        <InputField label="شماره تلفن" name="phone" defaultValue={data?.phone} register={register} error={errors?.phone} />
        <InputField label="آدرس" name="address" defaultValue={data?.address} register={register} error={errors?.address} />
        <InputField label="گروه خونی" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors?.bloodType} />
        <InputField label="تاریخ تولد" name="birthday" type="date" defaultValue={data?.birthday} register={register} error={errors?.birthday} />

        {/* انتخاب جنسیت */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 text-right">
          <label className="text-xs text-gray-500">جنسیت</label>
          <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")} defaultValue={data?.sex}>
            <option value="male">مذکر</option>
            <option value="female">مونث</option>
          </select>
          {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>}
        </div>

        {/* بارگذاری تصویر */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 text-right justify-center pt-4">
          <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
            <span>عکسی را بارگذاری کنید</span>
            <Image src='/upload.png' width={28} height={28} alt="" />
          </label>
          <input type="file" id="img" {...register('img')} className="hidden" />
          {errors.img?.message && <p className="text-xs text-red-400">{errors.img.message.toString()}</p>}
        </div>
      </div>

      {/* دکمه ارسال فرم */}
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "ایجاد" : "بروزرسانی"}
      </button>
    </form>
  );
}

export default TeacherForm;
