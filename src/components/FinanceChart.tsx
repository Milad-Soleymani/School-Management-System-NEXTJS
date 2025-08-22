'use client'

import Image from 'next/image'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// داده‌های مالی (در میلیون تومان)
const data = [
  { name: 'خرداد', درامد: 30, هزینه: 40 },
  { name: 'اردیبهشت', درامد: 90, هزینه: 4 },
  { name: 'فروردین', درامد: 390, هزینه: 50 },
  { name: 'اسفند', درامد: 20, هزینه: 90 },
  { name: 'بهمن', درامد: 1800, هزینه: 48 },
  { name: 'دی', درامد: 2700, هزینه: 3900 },
  { name: 'آذر', درامد: 200, هزینه: 199 },
  { name: 'آبان', درامد: 3000, هزینه: 98 },
  { name: 'مهر', درامد: 400, هزینه: 240 },
]

function FinanceChart() {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 shadow-sm">
      {/* بخش عنوان و آیکون گزینه‌ها */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold">مالی (میلیون تومان)</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="گزینه‌ها" />
      </div>

      {/* نمودار ریسپانسیو */}
      <ResponsiveContainer width="103%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* شبکه پس‌زمینه نمودار */}
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

          {/* محور افقی */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: '#d1d5db' }}
            tickLine={false}
            tickMargin={10}
          />

          {/* محور عمودی */}
          <YAxis
            axisLine={false}
            tick={{ fill: '#d1d5db' }}
            tickLine={false}
            tickMargin={10}
          />

          {/* ابزار نمایش اطلاعات هنگام هاور */}
          <Tooltip />

          {/* راهنمای نمودار */}
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
          />

          {/* خطوط نمودار */}
          <Line type="monotone" dataKey="درامد" stroke="#C3EBFA" strokeWidth={5} />
          <Line type="monotone" dataKey="هزینه" stroke="#CFCEFF" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FinanceChart
