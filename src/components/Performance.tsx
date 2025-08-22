"use client";

import Image from "next/image";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

// داده‌های نمودار
const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

export default function Performance() {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <Image src="/moreDark.png" width={16} height={16} alt="more options" />
        <h1 className="text-xl font-semibold">عملکرد</h1>
      </div>

      {/* PIE CHART */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8" // پیش‌فرض در صورت نبود رنگ در data
          />
        </PieChart>
      </ResponsiveContainer>

      {/* CENTER LABEL */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">۹.۲</h1>
        <p className="text-gray-400 text-xs">از ۱۰ امتیاز</p>
      </div>

      {/* FOOTER LABEL */}
      <div className="font-medium absolute bottom-16 left-0 right-0 text-center">
        ترم اول - ترم دوم
      </div>

    </div>
  );
}