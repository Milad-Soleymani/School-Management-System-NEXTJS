// AdminPage.jsx
// صفحه داشبورد ادمین - نمایش آمار، نمودارها و اطلاعیه‌ها
// Admin Dashboard Page - Displays statistics, charts, and announcements

import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import prisma from "@/lib/prisma";

const AdminPage= async () => {
  // سرور: تعداد دانش‌آموزان هر پایه را حساب می‌کنیم
  const firstGrade = await prisma.student.count({ where: { gradeId: 1 } })
  const secondGrade = await prisma.student.count({ where: { gradeId: 2 } })
  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row">
      {/* ================= LEFT SIDE ================= */}
      {/* سمت چپ شامل کارت‌های کاربری و نمودارها */}
      {/* Left section includes user cards and charts */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        
        {/* ==== USER CARDS ==== */}
        {/* کارت‌های خلاصه آمار کاربران مختلف */}
        {/* User summary cards for different roles */}
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard type="student" /> {/* Students */}
          <UserCard type="teacher" />       {/* Teachers */}
          <UserCard type="parent" />       {/* Parents */}
          <UserCard type="admin" />        {/* Admin */}
        </div>

        {/* ==== MIDDLE CHARTS ==== */}
        {/* شامل نمودار تعداد و حضور و غیاب */}
        {/* Includes count chart and attendance chart */}
        <div className="flex flex-col gap-4 lg:flex-row">
          
          {/* COUNT CHART */}
          {/* نمودار تعداد کاربران */}
          {/* User count chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart firstGrade={firstGrade} secondGrade={secondGrade} />
          </div>
          
          {/* ATTENDANCE CHART */}
          {/* نمودار حضور و غیاب */}
          {/* Attendance statistics chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>

        {/* ==== BOTTOM CHART ==== */}
        {/* نمودار وضعیت مالی */}
        {/* Financial overview chart */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      {/* سمت راست شامل تقویم رویدادها و اطلاعیه‌ها */}
      {/* Right section includes event calendar and announcements */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <EventCalendar />  {/* Event Calendar - تقویم رویدادها */}
        <Announcements />  {/* Announcements - اطلاعیه‌ها */}
      </div>
    </div>
  );
}

export default AdminPage;
