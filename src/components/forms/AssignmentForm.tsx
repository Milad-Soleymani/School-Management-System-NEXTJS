"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
    AssignmentSchema,
    assignmentSchema,
} from "@/lib/formValidationSchema";
import {
    createAssignment,
    updateAssignment,
} from "@/lib/actions";
import {
    useActionState,
    startTransition,
    useEffect,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

const formatDateTimeLocal = (value?: string | Date) => {
    if (!value) return "";
    const date = typeof value === "string" ? new Date(value) : value;
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
};

const AssignmentForm = ({
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
    } = useForm<AssignmentSchema>({
        resolver: zodResolver(assignmentSchema),
    });

    const [state, formAction] = useActionState(
        type === "create" ? createAssignment : updateAssignment,
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
        }
    );

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(
                type === "create"
                    ? "تکلیف با موفقیت ایجاد شد"
                    : "تکلیف با موفقیت ویرایش شد"
            );
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const { lessons = [] } = relatedData || {};
    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "ایجاد تکلیف جدید" : "ویرایش تکلیف"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="عنوان تکلیف"
                    name="title"
                    defaultValue={data?.title}
                    register={register}
                    error={errors?.title}
                />

                <InputField
                    label="تاریخ شروع تکلیف"
                    name="startDate"
                    type="datetime-local"
                    defaultValue={formatDateTimeLocal(data?.startDate)}
                    register={register}
                    error={errors?.startDate}
                />

                <InputField
                    label="مهلت تحویل"
                    name="dueDate"
                    type="datetime-local"
                    defaultValue={formatDateTimeLocal(data?.dueDate)}
                    register={register}
                    error={errors?.dueDate}
                />

                {data && (
                    <input
                        type="hidden"
                        {...register("id", { valueAsNumber: true })}
                        defaultValue={data.id}
                    />
                )}

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">درس</label>
                    <select
                        {...register("lessonId", { valueAsNumber: true })}
                        defaultValue={data?.lessonId ?? ""}
                    >
                        <option value="">انتخاب درس</option>

                        {lessons.map((lesson) => (
                            <option key={lesson.id} value={lesson.id}>
                                {lesson.name}
                            </option>
                        ))}
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

export default AssignmentForm;