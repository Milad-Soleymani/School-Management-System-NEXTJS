"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject } from "@/lib/actions";



// کامپوننت فرم معلم
function SubjectForm({ type, data }: { type: 'create' | 'update'; data?: any }) {
  // استفاده از react-hook-form همراه با Zod
  const { register, handleSubmit, formState: { errors } } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  // تابع ارسال فرم
  const onSubmit = handleSubmit((formData) => {
    createSubject(formData)
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* عنوان فرم */}
      <h1 className="text-xl font-semibold">{type === 'create' ? "ایجاد یک ماده درسی جدید" : "بروزرسانی ماده درسی "}</h1>

      
      <div className="flex gap-4 justify-between flex-wrap flex-row-reverse">
        <InputField label="نام کاربری" name="name" defaultValue={data?.name} register={register} error={errors?.name} />
      </div>
      {/* دکمه ارسال فرم */}
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2" onSubmit={onSubmit}>
        {type === "create" ? "ایجاد" : "بروزرسانی"}
      </button>
    </form>
  );
}

export default SubjectForm;
