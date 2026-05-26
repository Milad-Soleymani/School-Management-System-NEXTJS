"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject } from "@/lib/actions";
import { Dispatch, SetStateAction, startTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SubjectForm({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    startTransition(async () => {
      try {
        await createSubject(formData); // این تابع async است
        toast.success(`ماده درسی با موفقیت ${type === "create" ? "ساخته" : "بروزرسانی"} شد`);
        setOpen(false);
        router.refresh();
      } catch (err) {
        console.error(err);
        toast.error("مشکلی پیش آمد!");
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "ایجاد یک ماده درسی جدید" : "بروزرسانی ماده درسی "}
      </h1>

      <div className="flex gap-4 justify-between flex-wrap flex-row-reverse">
        <InputField
          label="نام کاربری"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
      </div>

      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "ایجاد" : "بروزرسانی"}
      </button>
    </form>
  );
}

export default SubjectForm;
