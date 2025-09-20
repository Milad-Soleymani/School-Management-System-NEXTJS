import React from 'react'
import AttendanceChart from './AttendanceChart'
import Image from 'next/image'
import prisma from '@/lib/prisma'

const AttendanceChartContainer = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const lastMonday = new Date(today)
    lastMonday.setDate(today.getDate() - daysSinceMonday)


    const resData = await prisma.attendance.findMany({
        where: {
            date: {
                gte: lastMonday
            }
        },
        select: {
            date: true,
            present: true
        }
    })
    // console.log(data)

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"]

    const attendanceMap: { [key: string]: { present: number, absent: number } } = {
        Mon: { present: 0, absent: 0 },
        Tue: { present: 0, absent: 0 },
        Wed: { present: 0, absent: 0 },
        Thu: { present: 0, absent: 0 },
        Fri: { present: 0, absent: 0 },
    };

    resData.forEach(item => {
        const itemDate = new Date(item.date); // ⚠️ حتما باید این خط باشه
        const itemDay = itemDate.getDay();    // حالا itemDate تعریف شده

        if (itemDay >= 1 && itemDay <= 5) {
            const dayName = daysOfWeek[itemDay - 1];

            if (item.present) {
                attendanceMap[dayName].present += 1;
            } else {
                attendanceMap[dayName].absent += 1;
            }
        }
    });


    const data = daysOfWeek.map(day => ({
        name: day,
        حاضر: attendanceMap[day].present,
        غایب: attendanceMap[day].absent
    }));

    return (
        <div className="bg-white rounded-lg p-4 h-full">
            {/* هدر نمودار */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">حضور و غایب</h1>
                <Image src="/moreDark.png" alt="بیشتر" width={20} height={20} />
            </div>
            <AttendanceChart data={data} />
        </div>
    )
}

export default AttendanceChartContainer