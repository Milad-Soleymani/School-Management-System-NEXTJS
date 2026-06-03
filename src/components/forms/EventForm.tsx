"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { EventSchema, eventSchema } from "@/lib/formValidationSchema";
import { createEvent, updateEvent } from "@/lib/actions";
import { useActionState, startTransition, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

const EventForm = ({
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
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createEvent : updateEvent,
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
          ? "رویداد با موفقیت ایجاد شد"
          : "رویداد با موفقیت ویرایش شد"
      );

      setOpen(false);
      router.refresh();
    }
  }, [state, router, setOpen, type]);

  const { classes = [] } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "ایجاد رویداد جدید"
          : "ویرایش رویداد"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="عنوان رویداد"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />

        <InputField
          label="زمان شروع"
          name="startTime"
          type="datetime-local"
          defaultValue={
            data?.startTime
              ? new Date(data.startTime).toISOString().slice(0, 16)
              : ""
          }
          register={register}
          error={errors?.startTime}
        />

        <InputField
          label="زمان پایان"
          name="endTime"
          type="datetime-local"
          defaultValue={
            data?.endTime
              ? new Date(data.endTime).toISOString().slice(0, 16)
              : ""
          }
          register={register}
          error={errors?.endTime}
        />

        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-gray-500">
            توضیحات
          </label>

          <textarea
            {...register("description")}
            defaultValue={data?.description}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full min-h-[120px]"
          />

          {errors.description?.message && (
            <p className="text-xs text-red-400">
              {errors.description.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">
            کلاس
          </label>

          <select
            {...register("classId", {
              setValueAs: (value) =>
                value === "" ? null : Number(value),
            })}
            defaultValue={data?.classId ?? ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">
              برای همه کلاس‌ها
            </option>

            {classes.map(
              (classItem: {
                id: number;
                name: string;
              }) => (
                <option
                  key={classItem.id}
                  value={classItem.id}
                >
                  {classItem.name}
                </option>
              )
            )}
          </select>

          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>

        {data && (
          <input
            type="hidden"
            {...register("id", {
              valueAsNumber: true,
            })}
            defaultValue={data.id}
          />
        )}
      </div>

      {state.error && (
        <span className="text-red-500">
          مشکلی رخ داده است
        </span>
      )}

      <button
        type="submit"
        className="bg-blue-400 text-white p-2 rounded-md"
      >
        {type === "create" ? "ایجاد" : "ویرایش"}
      </button>
    </form>
  );
};

export default EventForm;