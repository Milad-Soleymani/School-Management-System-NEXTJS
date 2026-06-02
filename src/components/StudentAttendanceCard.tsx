import prisma from "@/lib/prisma"
import { toPersianDigits } from "@/lib/utils"

const StudentAttendanceCard = async ({ id }: { id: string }) => {
    const attendance = await prisma.attendance.findMany({
        where: {
            studentId: id,
            // date: {
            //     gte: new Date(new Date().getFullYear(), 0, 1)
            // }
        }
    })

    const totalDays = attendance.length;
    const presentDays = attendance.filter(day => day.present).length
    const percentage = totalDays
        ? (presentDays / totalDays) * 100
        : 0;
    return (
        <div>

            <h1 className="text-xl font-semibold text-right">{toPersianDigits(percentage)}٪</h1>
            <span className="text-sm text-gray-400">حضور و غیاب</span>

        </div>
    )
}

export default StudentAttendanceCard
