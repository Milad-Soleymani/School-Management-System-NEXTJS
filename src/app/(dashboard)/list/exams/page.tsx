// ExamListPage.tsx
// صفحه لیست امتحانات - با داده استاتیک (بدون دیتابیس)

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";

// ========== Types ==========
// مدل داده‌ای امتحان بر اساس examsData در فایل data.ts
type ExamList = {
  id: number;
  subject: string;   // نام ماده درسی
  class: string;     // نام کلاس (مثلاً "هفتم ۱")
  teacher: string;   // نام معلم
  date: string;      // تاریخ شمسی (مثلاً "۱۴۰۵-۰۱-۰۱")
};

// ========== Table Columns ==========
const columns = [
  { header: "ماده درسی", accessor: "subject" },
  { header: "کلاس", accessor: "class", className: "hidden md:table-cell" },
  { header: "معلم", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "تاریخ", accessor: "date", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" },
];

// ========== Render Row Function ==========
const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* ماده درسی */}
    <td className="flex items-center gap-4 p-4">{item.subject}</td>

    {/* کلاس */}
    <td>{item.class}</td>

    {/* معلم */}
    <td className="hidden md:table-cell">{item.teacher}</td>

    {/* تاریخ (همان رشته شمسی) */}
    <td className="hidden md:table-cell">{item.date}</td>

    {/* عملیات (فقط ادمین) */}
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="exam" type="update" data={item} />
            <FormModal table="exam" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

// ========== Main Component ==========
const ExamListPage = () => {
  // استفاده مستقیم از داده استاتیک
  const data = examsData;
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

            {/* دکمه ایجاد امتحان جدید (فقط ادمین) */}
            {role === "admin" && <FormModal table="exam" type="create" />}

            {/* جستجو */}
            <TableSearch />
          </div>
        </div>

        {/* عنوان صفحه */}
        <h1 className="hidden md:block text-lg font-semibold">همه امتحانات</h1>
      </div>

      {/* ===== TABLE ===== */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* ===== PAGINATION ===== */}
      <Pagination page={page} count={count} />
    </div>
  );
};

export default ExamListPage;