"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchema";
import { createStudent, updateStudent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";



// =======================
//  کامپوننت فرم دانش‌آموز
// =======================
function StudentForm({
    type,
    data,
    setOpen,
    relatedData
}: {
    type: 'create' | 'update';
    data?: any;
    setOpen?: Dispatch<SetStateAction<boolean>>
    relatedData?: any
}) {
    // ایجاد فرم با React Hook Form و Zod
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<StudentSchema>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            birthday: data?.birthday
                ? new Date(data.birthday).toISOString().split("T")[0]
                : "",
        }
    });

    const [Img, setImg] = useState<any>()
    const formattedDate = data?.birthday
        ? new Date(data.birthday).toISOString().split("T")[0]
        : ""; const [state, formAction] = useActionState(
            type === "create" ? createStudent : updateStudent,
            { success: false, error: false }
        );

    const onSubmit = handleSubmit((formData) => {

        startTransition(() => {
            formAction({
                ...formData,
                img: Img?.secure_url || data?.img || undefined,
            });
        });
    },
        (errors) => {
            { errors.gradeId && <p>{errors.gradeId.message}</p> }
            { errors.classId && <p>{errors.classId.message}</p> }
        });
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(
                type === "create"
                    ? "دانش اموز با موفقیت ایجاد شد"
                    : "دانش اموز با موفقیت بروزرسانی شد"
            );

            setOpen?.(false);

            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { classes, grades } = relatedData;



    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
            {/* عنوان فرم */}
            <h1 className="text-xl font-semibold">{type === "create" ? "ایجاد دانش‌آموز جدید" : "بروزرسانی دانش‌آموز"}</h1>

            {/* بخش اطلاعات هویتی */}
            <span className="text-xs font-medium text-gray-400">اطلاعات هویتی</span>
            <div className="flex flex-wrap gap-2 justify-between flex-row-reverse">
                <InputField
                    label="نام کاربری"
                    name="username"
                    defaultValue={data?.username}
                    register={register}
                    error={errors?.username as FieldError | undefined}
                />
                <InputField
                    label="پست الکترونیک"
                    name="email"
                    defaultValue={data?.email}
                    register={register}
                    error={errors?.email as FieldError | undefined}
                />
                <InputField
                    label="رمز عبور"
                    name="password"
                    type="password"
                    defaultValue={data?.password}
                    register={register}
                    error={errors?.password as FieldError | undefined}
                />
            </div>

            {/* بخش اطلاعات شخصی */}
            <span className="text-xs font-medium text-gray-400">اطلاعات شخصی</span>
            {/* آپلود تصویر */}
            <CldUploadWidget uploadPreset="school" onSuccess={(result, { widget }) => {
                setImg(result.info)
                widget.close()
            }}>
                {({ open }) => {
                    return (
                        <div className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" onClick={() => open()}>
                            <span>عکسی را بارگذاری کنید</span>
                            <Image src='/upload.png' width={28} height={28} alt="" />
                        </div>
                    );
                }}
            </CldUploadWidget>
            <div className="flex flex-wrap gap-0.5 justify-between flex-row-reverse">
                <InputField
                    label="نام"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name as FieldError | undefined}
                />
                <InputField
                    label="نام خانوادگی"
                    name="surname"
                    defaultValue={data?.surname}
                    register={register}
                    error={errors?.surname as FieldError | undefined}
                />
                <InputField
                    label="شماره تلفن"
                    name="phone"
                    defaultValue={data?.phone}
                    register={register}
                    error={errors?.phone as FieldError | undefined}
                />
                <InputField
                    label="آدرس"
                    name="address"
                    defaultValue={data?.address}
                    register={register}
                    error={errors?.address as FieldError | undefined}
                />
                <InputField
                    label="گروه خونی"
                    name="bloodType"
                    defaultValue={data?.bloodType}
                    register={register}
                    error={errors?.bloodType as FieldError | undefined}
                />
                <InputField
                    label="تاریخ تولد"
                    name="birthday"
                    defaultValue={data?.birthday}
                    register={register}
                    error={errors?.birthday as FieldError | undefined}
                    type="date"
                />
                <InputField
                    label="شناسه والدین"
                    name="parentId"
                    defaultValue={data?.parentId}
                    register={register}
                    error={errors?.parentId as FieldError | undefined}
                />

                {data && (
                    <input
                        type="hidden"
                        {...register("id")}
                        defaultValue={data.id}
                    />
                )}
                {/* انتخاب جنسیت */}
                <div className="flex flex-col gap-2 w-full md:w-1/4 text-right">
                    <label className="text-xs text-gray-500">جنسیت</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("sex")}
                        defaultValue={data?.sex}
                    >
                        <option value="MALE">مذکر</option>
                        <option value="FEMALE">مونث</option>
                    </select>
                    {errors.sex?.message && (
                        <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4 text-right">
                    <label className="text-xs text-gray-500">پایه </label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("gradeId", { valueAsNumber: true })}
                        defaultValue={
                            data?.gradeId
                        }
                    >
                        {grades.map(
                            (grade: { id: number; level: number }) => (
                                <option value={grade.id} key={grade.id}>
                                    {grade.level}
                                </option>
                            )
                        )}
                    </select>
                    {errors.gradeId?.message && <p className="text-xs text-red-400">{errors.gradeId.message.toString()}</p>}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/4 text-right">
                    <label className="text-xs text-gray-500">کلاس </label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("classId", { valueAsNumber: true })}
                        defaultValue={
                            data?.classId
                        }
                    >
                        {classes.map(
                            (classItem: { id: number; name: string; capacity: number; _count: { students: number } }) => (
                                <option value={classItem.id} key={classItem.id}>
                                    {classItem.name} - {classItem._count.students + " (" + classItem.capacity}{" ظرفیت)"}
                                </option>
                            )
                        )}
                    </select>
                    {errors.classId?.message && <p className="text-xs text-red-400">{errors.classId.message.toString()}</p>}
                </div>


            </div>

            {/* دکمه ارسال فرم */}
            <button
                type="submit"
                className="bg-blue-400 text-white rounded-md p-2 hover:bg-blue-500 transition-colors duration-300"
            >
                {type === "create" ? "ایجاد" : "بروزرسانی"}
            </button>
        </form>
    );
}

export default StudentForm;
