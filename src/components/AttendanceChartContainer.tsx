import React from 'react'
import AttendanceChart from './AttendanceChart'
import Image from 'next/image'

const AttendanceChartContainer = async() => {
    return (
        <div className="bg-white rounded-lg p-4 h-full">
            {/* هدر نمودار */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">حضور و غایب</h1>
                <Image src="/moreDark.png" alt="بیشتر" width={20} height={20} />
            </div>
            <AttendanceChart />
        </div>
    )
}

export default AttendanceChartContainer