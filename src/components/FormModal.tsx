"use client"

import React, { Dispatch, SetStateAction, useActionState, useEffect, useState } from 'react';
import Image from "next/image";
import dynamic from "next/dynamic";
import { OrbitProgress } from "react-loading-indicators";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteClass, deleteSubject, deleteTeacher } from '@/lib/actions';
import { FormContainerProps } from './forms/FormContainer';
import ClassForm from './forms/ClassForm';

const deleteActionMap = {
    subject: deleteSubject,
    class: deleteClass,
    teacher: deleteTeacher,
    student: deleteSubject,
    parent: deleteSubject,
    lesson: deleteSubject,
    exam: deleteSubject,
    assignment: deleteSubject,
    result: deleteSubject,
    attendance: deleteSubject,
    event: deleteSubject,
    announcement: deleteSubject,
}

const TABLE_NAMES_FA = {
    teacher: 'معلم',
    student: 'دانش‌آموز',
    parent: 'والدین',
    subject: 'ماده درسی',
    class: 'کلاس',
    lesson: 'درس',
    exam: 'امتحان',
    assignment: 'تکلیف',
    result: 'نتیجه',
    attendance: 'حضور و غیاب',
    event: 'رویداد',
    announcement: 'اطلاعیه',
};

// لود داینامیک فرم‌ها با loading indicator
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
    loading: () => <div className="flex justify-center items-center">
        <OrbitProgress color="#CFCEFF" size="medium" text="" textColor="" />
    </div>
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
    loading: () => <div className="flex justify-center items-center">
        <OrbitProgress color="#CFCEFF" size="medium" text="" textColor="" />
    </div>
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
    loading: () => <div className="flex justify-center items-center">
        <OrbitProgress color="#CFCEFF" size="medium" text="" textColor="" />
    </div>
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
    loading: () => <div className="flex justify-center items-center">
        <OrbitProgress color="#CFCEFF" size="medium" text="" textColor="" />
    </div>
    })

// ✅ درست - اضافه کردن relatedData
const forms: {
    [key: string]: (
        setOpen: Dispatch<SetStateAction<boolean>>,
        type: "create" | "update",
        data?: unknown,
        relatedData?: any
    ) => React.ReactNode
} = {
    subject: (setOpen, type, data, relatedData) => (
        <SubjectForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    class: (setOpen, type, data, relatedData) => (
        <ClassForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    teacher: (setOpen, type, data, relatedData) => (
        <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
    ),
    // student: (setOpen, type, data) => (
    //     <StudentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
    // )
};

function FormModal({
    table,
    type,
    data,
    id,
    relatedData  // اینو از props بگیر
}: FormContainerProps & { relatedData?: any }) {
    const [open, setOpen] = useState(false);
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-specialYellow" : type === "update" ? "bg-blueSky" : "bg-specialPurple";

    const [state, formAction] = useActionState(deleteActionMap[table], {
        success: false,
        error: false,
    });
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Subject has been deleted!`);
            setOpen(false);
            router.refresh();
        }
    }, [state]);
    const persianTable = TABLE_NAMES_FA[table];
    const renderForm = () => {
        if (type === "delete" && id) {
            return (
                <form action={formAction} className="p-4 flex flex-col gap-4">
                    <input type="text | number" name='id' value={id} hidden />
                    <span className="text-center font-medium">
                        ایا مطمئنید که میخواهید این {persianTable} را حذف کنید. همه داده ها حذف خواهد شد
                    </span>
                    <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
                        حذف کن
                    </button>
                </form>
            );
        } else if (type === "create" || type === "update") {
            // ✅ relatedData رو پاس بده
            return forms[table](setOpen, type, data, relatedData);
        } else {
            return <span>فرم پیدا نشد</span>;
        }
    };

    return (
        <>
            <button
                className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
                onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} width={16} height={16} alt={type} />
            </button>

            {open && (
                <div className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-4 relative w-[90%] md:w-[70%] lg:w-[65%] xl:w-[50%] 2xl:w-[40%] text-right flex flex-col">
                        {renderForm()}
                        <div
                            className="absolute top-4 left-4 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <Image src='/close.png' width={14} height={14} alt="close" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FormModal;