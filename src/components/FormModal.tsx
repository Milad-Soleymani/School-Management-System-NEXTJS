"use client"

import Image from "next/image";
import { useState } from "react";
// import TeacherForm from "./fomrs/TeacherForm";
// import StudentForm from "./fomrs/StudentForm";
import dynamic from "next/dynamic";
import { OrbitProgress } from "react-loading-indicators";

const TeacherForm = dynamic(() => import("./fomrs/TeacherForm"), 
{
    loading: ()=> <div><OrbitProgress  color="#CFCEFF" size="medium" text="" textColor="" /></div>
}
)


const StudentForm = dynamic(() => import("./fomrs/StudentForm"), 
{
    loading: ()=> <div className=" flex justify-center items-center" ><OrbitProgress  color="#CFCEFF" size="medium" text="" textColor="" /></div>    
}
)

const forms: { [key: string]: (type: "create" | "update", data?: any) => JSX.Element;}={
    teacher: (type, data) => <TeacherForm type={type} data={data} />, 
    student: (type, data) => <StudentForm type={type} data={data} />
}

function FormModal({ table, type, data, id }: {
    table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number;
}
) {
    const size = type === "create" ? "w-8 h-8 " : "w-7 h-7"
    const bgColor = type === "create" ? "bg-specialYellow" : type === "update" ? "bg-blueSky" : "bg-specialPurple"
    const [open, setOpen] = useState(false)


    const Form = () => {
        return type === "delete" && id ? <form action='' className="p-4 flex flex-col gap-4">
            <span className="text-center font-medium"> All data will be lost. Are you sure you want to delete this {table}? </span>
            <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
        </form> : type === "create" || "update" ?
        (
            forms[table](type, data)
        ) : "Form Not Found"
    }
    return (
        <>
            <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={() => setOpen(true)}>
                <Image src={`/${type}.png`} width={16} height={16} alt="" />
            </button>
            {open && <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                <div className="bg-white rounded-md p-4 flex-row-reverse text-right relative w-[90%] md:w-[70%} lg:w-[65%] xl:w-[50%] 2x;:w-[40%] ">
                    <Form />
                    <div className="absolute top-4 left-4 cursor-pointer" onClick={() => setOpen(false)}>
                        <Image src='/close.png' width={14} height={14} alt="" />
                    </div>
                </div>
            </div>}
        </>



    )
}
export default FormModal
