'use client'

import Image from 'next/image'
import React from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

type Props = {
  firstGrade: number
  secondGrade: number
}

const CountChart: React.FC<Props> = ({ firstGrade, secondGrade }) => {
  const total = firstGrade + secondGrade

  const data = [
    { name: 'هفتم', count: firstGrade, fill: '#C3EBFA' },
    { name: 'هشتم', count: secondGrade, fill: '#FAE27C' },
    { name: 'مجموع', count: total, fill: '#ffffff' },
  ]

  const fmt = (n: number) => n.toLocaleString('fa-IR')

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">دانش‌آموزان</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="گزینه‌های بیشتر" />
      </div>

      {/* chart area — والد ResponsiveContainer باید ارتفاع ثابت داشته باشه */}
      <div className="relative w-full h-[250px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={92}
            data={data}
          >
            {/* بدون formatter داخلی — داده‌ها عددی هستند */}
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* center icon */}
        <Image
          src="/male.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          width={20}
          height={20}
          alt="آیکون دانش‌آموز"
        />
      </div>

      {/* legend / bottom — اعداد فارسی */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-blueSky rounded-full" />
          <h1 className="font-bold">{fmt(firstGrade)}</h1>
          <h2 className="text-xs text-gray-500">هفتم ({Math.round((firstGrade / (total || 1)) * 100)}٪)</h2>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-specialYellow rounded-full" />
          <h1 className="font-bold">{fmt(secondGrade)}</h1>
          <h2 className="text-xs text-gray-500">هشتم ({Math.round((secondGrade / (total || 1)) * 100)}٪)</h2>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-specialPurple rounded-full" />
          <h1 className="font-bold">{fmt(total)}</h1>
          <h2 className="text-xs text-gray-500">مجموع (۱۰۰٪)</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChart
