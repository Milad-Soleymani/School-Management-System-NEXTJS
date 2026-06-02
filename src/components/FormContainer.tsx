import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

export type FormContainerProps = {
    table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type: "create" | "update" | "delete";
    data?: unknown;
    id?: string | number;
    relatedData?: any;
}

const FormContainer = async ({
    table,
    type,
    data,
    id,
    relatedData
}: FormContainerProps) => {
    let relatedData = {}



    if(type !== "delete"){
        switch (table) {
            case "subject":
                const subjectTeachers = await prisma.teacher.findmany({
                    select:{id:true,name: true,surname: true}
                })
                relatedData = {teachers: subjectTeachers}
            break;

            default:
                break;
        }
    }

    return (
        <div><FormModal table={table} type={type} data={data} id={id} relatedData={relatedData}/></div>
    )
}

export default FormContainer;