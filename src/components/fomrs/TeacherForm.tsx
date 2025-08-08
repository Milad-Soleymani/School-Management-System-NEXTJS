"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";

const schema = z.object({
    username: z.string()
        .min(3, { message: '!نام کاربری باید حداقل ۳ کاراکتر باشد' })
        .max(20, { message: '!نام کاربری باید حداکثر ۲۰ کاراکتر باشد' }),
    email: z.string()
        .email({ message: "!آدرس ایمیل نامعتبر است" }),
    password: z.string()
        .min(8, { message: '!رمز عبور باید حداقل ۸ کاراکتر باشد' }),
    firstname: z.string()
        .min(3, { message: '!نام کوچک الزامی است' }),
    lastname: z.string()
        .min(3, { message: '!نام خانوادگی الزامی است' }),
    phone: z.string()
        .min(3, { message: '!شماره تلفن الزامی است' }),
    address: z.string()
        .min(3, { message: '!آدرس الزامی است' }),
    birthday: z.date({ message: '!تاریخ تولد الزامی است' }),
    sex: z.enum(["male", "female"], { message: "!جنسیت الزامی است" }),
    img: z.instanceof(File).optional() // به عنوان اختیاری مشخص شده است
});

function TeacherForm({ type, data }: { type: 'create' | 'update'; data?: any }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">ایجاد یک معلم جدید</h1>
            <span className="text-xs font-medium text-gray-400">اطلاعات هویتی</span>
            <InputField
                label="نام کاربری"
                name="username"
                defaultValue={data?.username}
                register={register}
                error={errors?.username}
            />
            <span className="text-xs font-medium text-gray-400">اطلاعات شخصی</span>

            <button type="submit" className=" bg-blue-400 text-white rounded-md p-2">{type === "create" ? "ایجاد" : "بروزرسانی"}</button>
        </form>
    );
}

export default TeacherForm;