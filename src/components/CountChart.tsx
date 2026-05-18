'use client'

import Image from 'next/image'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

// داده‌های نمودار دانش‌آموزان
const data = [
  { name: 'هفتم', count: 200, fill: '#C3EBFA' },
  { name: 'هشتم', count: 190, fill: '#FAE27C' },
  { name: 'نهم', count: 182, fill: '#CFCEFF' },
  { name: 'مجموع', count: 360, fill: 'white' },
]

function CountChart() {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* بخش عنوان */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">دانش‌آموزان</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="گزینه‌های بیشتر" />
      </div>

      {/* بخش نمودار */}
      <div className="relative w-full h-[250px] mb-6">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={92}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* تصویر وسط نمودار */}
        <Image
          src="/male.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          width={20}
          height={20}
          alt="آیکون دانش‌آموز"
        />
      </div>

      {/* بخش پایین نمودار (لِجِند) */}
      <div className="flex justify-center gap-16">
        {/* هر کلاس به صورت کارت */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-blueSky rounded-full" />
          <h1 className="font-bold">۱،۲۳۴</h1>
          <h2 className="text-xs text-gray-500">هفتم (۲۰٪)</h2>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-specialYellow rounded-full" />
          <h1 className="font-bold">۴،۹۳۶</h1>
          <h2 className="text-xs text-gray-500">هشتم (۳۰٪)</h2>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-specialPurple rounded-full" />
          <h1 className="font-bold">۱،۲۳۴</h1>
          <h2 className="text-xs text-gray-500">نهم (۳۰٪)</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChart
