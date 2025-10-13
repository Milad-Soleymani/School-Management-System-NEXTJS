"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchema";
import { createSubject } from "@/lib/actions";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";




// کامپوننت فرم معلم
function SubjectForm({ type, data, setOpen }: { type: 'create' | 'update'; data?: any; setOpen: Dispatch<SetStateAction<boolean>> }) {
  // استفاده از react-hook-form همراه با Zod
  const { register, handleSubmit, formState: { errors } } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction] = useActionState(createSubject, { success: false, error: false })

  // تابع ارسال فرم
  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction(formData);
    });
  });

  const router =useRouter()

  useEffect(() => {
    if (state.success) {
      toast(`ماده درسی با موفقیت ${type === "create" ? "ساخته شد" : "بروز شد"}`)
      setOpen(false)
      router.refresh()
    }
  }, [state])

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* عنوان فرم */}
      <h1 className="text-xl font-semibold">{type === "create" ? "ایجاد یک ماده درسی جدید" : "بروز کردن ماده درسی"}</h1>

      {/* بخش اطلاعات هویتی */}
      <div className="flex gap-4 justify-between flex-wrap flex-row-reverse">
        <InputField label="نام کاربری" name="name" defaultValue={data?.username} register={register} error={errors?.name} />
      </div>

      {state.error && <span className="text-red-500">اشتباهی رخ داد</span>}

      {/* دکمه ارسال فرم */}
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "ایجاد" : "بروزرسانی"}
      </button>
    </form>
  );
}

export default SubjectForm;
