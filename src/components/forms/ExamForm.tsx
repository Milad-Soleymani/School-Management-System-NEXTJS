"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { ExamSchema, examSchema, subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createExam, createSubject, updateExam, updateSubject } from "@/lib/actions";
import { useActionState, startTransition, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

const ExamForm = ({
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
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });
  const [state, formAction] = useActionState(
    type === "create" ? createExam : updateExam,
    { success: false, error: false }
  );

const onSubmit = handleSubmit(
  (formData) => {

    startTransition(() => {
      formAction(formData);
    });
  },
  (errors) => {
    console.log("ERRORS", errors);
  })

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        type === "create"
          ? "امتحان با موفقیت ایجاد شد"
          : "امتحان با موفقیت به‌روزرسانی شد"
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { lessons = [] } = relatedData || {};
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "ایجاد امتحان جدید"
          : "ویرایش امتحان"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="نام امتحان"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />

        <InputField
          label="تاریخ شروع امتحان"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors?.startTime}
          type="datetime-local"
        />

        <InputField
          label="تاریخ پایان امتحان"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors?.endTime}
          type="datetime-local"
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
          <label className="text-xs text-gray-500">دروس</label>
          <select

            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("lessonId", { valueAsNumber: true })}
            defaultValue={data?.lessonId}
          >
            {lessons.length > 0 ? (
              lessons.map(
                (lesson: { id: number; title: string; }) => (
                  <option value={lesson.id} key={lesson.id}>
                    {lesson.name}
                  </option>
                )
              )
            ) : (
              <option disabled>درسی یافت نشد</option>
            )}
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
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

export default ExamForm;