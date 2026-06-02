"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject, updateSubject } from "@/lib/actions";
import { useActionState, startTransition, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

const SubjectForm = ({
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
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createSubject : updateSubject,
    { success: false, error: false }
  );

  const onSubmit = handleSubmit((formData) => {
      console.log(formData);
    startTransition(() => {
      formAction(formData);
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        type === "create"
          ? "ماده درسی با موفقیت ایجاد شد"
          : "ماده درسی با موفقیت به‌روزرسانی شد"
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers = [] } = relatedData || {};
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "ایجاد ماده درسی جدید"
          : "ویرایش ماده درسی"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="نام ماده درسی"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />



        {/* فقط در حالت update یک فیلد مخفی برای id می‌سازیم */}
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
          <label className="text-xs text-gray-500">معلم‌ها</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teachers")}
            defaultValue={data?.teachers?.map((t: any) => t.id) ?? []}
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
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers.message.toString()}
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

export default SubjectForm;