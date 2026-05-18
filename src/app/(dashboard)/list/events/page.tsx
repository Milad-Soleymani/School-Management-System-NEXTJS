// EventListPage.tsx
// صفحه لیست رویدادها - با داده استاتیک (بدون دیتابیس)
// Events List Page - using static data

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";

// ========== Types ==========
// مدل داده‌ای رویداد بر اساس eventsData در فایل data.ts
type EventList = {
  id: number;
  title: string;        // عنوان رویداد
  class: string;        // نام کلاس (رشته ساده)
  date: string;         // تاریخ شمسی (مثلاً "۱۴۰۵-۰۱-۰۱")
  startTime: string;    // ساعت شروع (مثلاً "۱۰:۰۰")
  endTime: string;      // ساعت پایان (مثلاً "۱۱:۰۰")
};

// ========== Table Columns ==========
const columns = [
  { header: "موضوع", accessor: "title" },
  { header: "کلاس", accessor: "class", className: "hidden md:table-cell" },
  { header: "تاریخ", accessor: "date", className: "hidden md:table-cell" },
  { header: "زمان شروع", accessor: "startTime", className: "hidden md:table-cell" },
  { header: "زمان پایان", accessor: "endTime", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" },
];

// ========== Render Row Function ==========
const renderRow = (item: EventList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* عنوان رویداد */}
    <td className="flex items-center gap-4 p-4">{item.title}</td>

    {/* کلاس */}
    <td>{item.class}</td>

    {/* تاریخ (همان رشته شمسی) */}
    <td className="hidden md:table-cell">{item.date}</td>

    {/* ساعت شروع */}
    <td className="hidden md:table-cell">{item.startTime}</td>

    {/* ساعت پایان */}
    <td className="hidden md:table-cell">{item.endTime}</td>

    {/* عملیات (فقط ادمین) */}
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="event" type="update" data={item} />
            <FormModal table="event" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

// ========== Main Component ==========
const EventListPage = () => {
  // استفاده مستقیم از داده استاتیک
  const data = eventsData;
  const count = data.length;
  const page = 1; // صفحه‌بندی ساده (در صورت نیاز بعداً اضافه شود)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* ===== TOP BAR ===== */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            {/* دکمه فیلتر */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            {/* دکمه مرتب‌سازی */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {/* دکمه ایجاد رویداد جدید (فقط ادمین) */}
            {role === "admin" && <FormModal table="event" type="create" />}

            {/* جستجو */}
            <TableSearch />
          </div>
        </div>

        {/* عنوان صفحه */}
        <h1 className="hidden md:block text-lg font-semibold">همه رویدادها</h1>
      </div>

      {/* ===== TABLE ===== */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* ===== PAGINATION ===== */}
      <Pagination page={page} count={count} />
    </div>
  );
};

export default EventListPage;