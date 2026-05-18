// ClassListPage.tsx
// صفحه لیست کلاس‌ها - با داده استاتیک (بدون دیتابیس)
// Classes List Page - using static data

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";

// ========== Types ==========
// مدل داده‌ای کلاس بر اساس classesData در فایل data.ts
type ClassList = {
  id: number;
  name: string;        // نام کلاس (مثلاً "هفتم ۱")
  capacity: number;    // ظرفیت
  grade: number;       // پایه (عدد: 7, 8, 9)
  supervisor: string;  // نام ناظر
};

// ========== Table Columns ==========
const columns = [
  { header: "نام کلاس", accessor: "name" },
  { header: "ظرفیت", accessor: "capacity", className: "hidden md:table-cell" },
  { header: "پایه", accessor: "grade", className: "hidden md:table-cell" },
  { header: "ناظر", accessor: "supervisor", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" },
];

// ========== Render Row Function ==========
const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* نام کلاس */}
    <td className="flex items-center gap-4 p-4">{item.name}</td>

    {/* ظرفیت */}
    <td className="hidden md:table-cell">{item.capacity}</td>

    {/* پایه (عدد 7,8,9 به صورت عدد نمایش داده می‌شود) */}
    <td className="hidden md:table-cell">{item.grade}</td>

    {/* ناظر */}
    <td className="hidden md:table-cell">{item.supervisor}</td>

    {/* عملیات (فقط ادمین) */}
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="class" type="update" data={item} />
            <FormModal table="class" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

// ========== Main Component ==========
const ClassListPage = () => {
  // استفاده مستقیم از داده استاتیک
  const data = classesData;
  const count = data.length;
  const page = 1; // صفحه‌بندی ساده (در صورت نیاز می‌توان با useState و فیلتر کردن سمت کلاینت پیاده کرد)

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

            {/* دکمه ایجاد کلاس جدید (فقط ادمین) */}
            {role === "admin" && <FormModal table="class" type="create" />}

            {/* جستجو */}
            <TableSearch />
          </div>
        </div>

        {/* عنوان صفحه */}
        <h1 className="hidden md:block text-lg font-semibold">همه کلاس‌ها</h1>
      </div>

      {/* ===== TABLE ===== */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* ===== PAGINATION ===== */}
      <Pagination page={page} count={count} />
    </div>
  );
};

export default ClassListPage;