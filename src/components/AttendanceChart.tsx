"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// داده‌های نمونه برای نمودار حضور و غیاب
const attendanceData = [
  { name: "چهارشنبه", حاضر: 230, غایب: 20 },
  { name: "سه شنبه", حاضر: 300, غایب: 23 },
  { name: "دوشنبه", حاضر: 200, غایب: 10 },
  { name: "یکشنبه", حاضر: 360, غایب: 26 },
  { name: "شنبه", حاضر: 200, غایب: 160 },
];

// کامپوننت نمودار حضور و غیاب
function AttendanceChart() {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      {/* هدر نمودار */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">حضور و غایب</h1>
        <Image src="/moreDark.png" alt="بیشتر" width={20} height={20} />
      </div>

      {/* نمودار واکنش‌گرا */}
      <ResponsiveContainer width="100%" height='90%'>
        <BarChart
          data={attendanceData}
          barSize={20}
        >
          {/* شبکه پس‌زمینه نمودار */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />

          {/* محور افقی */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />

          {/* محور عمودی */}
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />

          {/* تولتیپ */}
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />

          {/* لیجند */}
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />

          {/* میله‌ها */}
          <Bar dataKey="حاضر" fill="#FAE27C" legendType="circle" radius={[10, 10, 0, 0]} />
          <Bar dataKey="غایب" fill="#C3EBFA" legendType="circle" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
