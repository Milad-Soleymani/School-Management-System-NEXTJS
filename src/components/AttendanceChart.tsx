"use client";

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

interface AttendanceData {
  name: string;
  حاضر: number;
  غایب: number;
}

// کامپوننت نمودار حضور و غیاب
const AttendanceChart = ({ data }: { data: AttendanceData[] }) => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data} barSize={20}>
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
        <Tooltip
          contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
        />

        {/* لیجند */}
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
        />

        {/* میله‌ها */}
        <Bar
          dataKey="حاضر"
          fill="#FAE27C"
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="غایب"
          fill="#C3EBFA"
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
