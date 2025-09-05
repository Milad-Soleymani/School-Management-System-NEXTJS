"use client"

import React, { useState } from 'react';
import Image from "next/image";
import dynamic from "next/dynamic";
import { OrbitProgress } from "react-loading-indicators";

// لود داینامیک فرم‌ها با loading indicator
const TeacherForm = dynamic(() => import("./fomrs/TeacherForm"), {
    loading: () => <div className="flex justify-center items-center">
        <OrbitProgress color="#CFCEFF" size="medium" text="" textColor="" />
    </div>
});

const StudentForm = dynamic(() => import("./fomrs/StudentForm"), {
    loading: () => <div className="flex justify-center items-center">
        <OrbitProgress color="#CFCEFF" size="medium" text="" textColor="" />
    </div>
});

// مپ فرم‌ها بر اساس نوع جدول
const forms: { [key: string]: (type: "create" | "update", data?: unknown) => React.ReactNode } = {
    teacher: (type, data) => <TeacherForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />
};

// کامپوننت اصلی Modal
function FormModal({
    table,
    type,
    data,
    id
}: {
    table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type: "create" | "update" | "delete";
    data?: unknown;
    id?: string | number;
}) {
    const [open, setOpen] = useState(false);

    // تعیین سایز و رنگ دکمه بر اساس نوع عملیات
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-specialYellow" : type === "update" ? "bg-blueSky" : "bg-specialPurple";

    // تابع رندر فرم بر اساس نوع عملیات
    const renderForm = () => {
        if (type === "delete" && id) {
            return (
                <form className="p-4 flex flex-col gap-4">
                    <span className="text-center font-medium">
                        All data will be lost. Are you sure you want to delete this {table}?
                    </span>
                    <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
                        Delete
                    </button>
                </form>
            );
        } else if (type === "create" || type === "update") {
            return forms[table](type, data);
        } else {
            return <span>Form Not Found</span>;
        }
    };

    return (
        <>
            {/* دکمه باز کردن Modal */}
            <button
                className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
                onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} width={16} height={16} alt={type} />
            </button>

            {/* خود Modal */}
            {open && (
                <div className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-4 relative w-[90%] md:w-[70%] lg:w-[65%] xl:w-[50%] 2xl:w-[40%] text-right flex flex-col">
                        {renderForm()}

                        {/* دکمه بستن */}
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
