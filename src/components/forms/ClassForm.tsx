"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { classSchema, ClassSchema } from "@/lib/formValidationSchema";
import { createClass, updateClass } from "@/lib/actions";
import { useActionState, startTransition, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createClass : updateClass,
    { success: false, error: false }
  );

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction(formData);
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        type === "create"
          ? "کلاس با موفقیت ایجاد شد"
          : "کلاس با موفقیت به‌روزرسانی شد"
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers, grades } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "ایجاد کلاس جدید"
          : "ویرایش کلاس"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="نام کلاس"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />

        <InputField
          label="ظرفیت کلاس"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />


        {data && (
          <input
            label="شناسه"
            name="id"
            defaultValue={data.id}
            {...register("id", { valueAsNumber: true })}
            error={errors?.id}
            hidden
          />
        )}

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">معلم‌</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId")}
            defaultValue={data?.supervisorId}
          >
            {teachers.length > 0 ? (
              teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option value={teacher.id} key={teacher.id}>
                    {teacher.name + " " + teacher.surname}
                  </option>
                )
              )
            ) : (
              <option disabled>معلمی یافت نشد</option>
            )}
          </select>

          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">پایه</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId", { valueAsNumber: true })}
            defaultValue={data?.gradeId}
          >
            {grades.length > 0 ? (
              grades.map(
                (grade: { id: number, level: number }) => (
                  <option value={grade.id} key={grade.id}>
                    {grade.level}
                  </option>
                )
              )
            ) : (
              <option disabled>پایه یافت نشد</option>
            )}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>
      </div>

      {state.error && (
        <span className="text-red-500">مشکلی پیش آمد</span>
      )}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "ایجاد" : "ویرایش"}
      </button>
    </form>
  );
};

export default ClassForm;