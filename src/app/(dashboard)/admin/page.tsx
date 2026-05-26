// AdminPage.tsx
import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChart from "@/components/CountChart";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import prisma from "@/lib/prisma";

const AdminPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  // سرور: تعداد دانش‌آموزان هر پایه
  const firstGrade = await prisma.student.count({ where: { gradeId: 1 } });
  const secondGrade = await prisma.student.count({ where: { gradeId: 2 } });

  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row">
      {/* ================= LEFT SIDE ================= */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* ==== USER CARDS ==== */}
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="admin" />
        </div>

        {/* ==== MIDDLE CHARTS ==== */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart firstGrade={firstGrade} secondGrade={secondGrade} />
          </div>

          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>

        {/* ==== BOTTOM CHART ==== */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {/* Event Calendar Container - ارسال searchParams به آن */}
        <EventCalendarContainer searchParams={searchParams} />

        {/* Announcements */}
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
