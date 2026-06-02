"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchema";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from 'next-cloudinary';


// کامپوننت فرم معلم
function TeacherForm({
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
  // استفاده از react-hook-form همراه با Zod
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
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
      type === "create" ? createTeacher : updateTeacher,
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
      console.log("FORM ERRORS", errors);

      console.log("BIRTHDAY ERROR =", errors.birthday);
      console.log("IMG ERROR =", errors.img);
    });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        type === "create"
          ? "معلم با موفقیت ایجاد شد"
          : "معلم با موفقیت بروزرسانی شد"
      );

      setOpen?.(false);

      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { subjects } = relatedData;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* عنوان فرم */}
      <h1 className="text-xl font-semibold">{type === "create" ? "ایجاد یک معلم جدید" : "بروزرسانی معلم"}</h1>

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
        <InputField
          label="نام"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />

        <InputField
          label="نام خانوادگی"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors?.surname}
        />

        <InputField
          label="شماره تلفن"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />

        <InputField
          label="آدرس"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />

        <InputField
          label="گروه خونی"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors?.bloodType}
        />

        <InputField
          label="تاریخ تولد"
          name="birthday"
          type="date"
          register={register}
          error={errors?.birthday}
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
          <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")} defaultValue={data?.sex}>
            <option value="MALE">مذکر</option>
            <option value="FEMALE">مونث</option>
          </select>
          {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 text-right">
          <label className="text-xs text-gray-500">مواد درسی</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjects")}
            defaultValue={
              data?.subjects?.map(
                (subject: { id: number }) => subject.id.toString()
              ) || []
            }
          >            {subjects.map(
            (subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            )
          )}
          </select>
          {errors.subjects?.message && <p className="text-xs text-red-400">{errors.subjects.message.toString()}</p>}
        </div>


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

      </div>

      {/* دکمه ارسال فرم */}
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "ایجاد" : "بروزرسانی"}
      </button>
    </form>
  );
}

export default TeacherForm;
