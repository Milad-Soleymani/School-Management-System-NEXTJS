// SubjectListPage.tsx
// صفحه لیست مواد درسی - با داده استاتیک (بدون دیتابیس)

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, subjectsData } from "@/lib/data";
import Image from "next/image";
import React from "react";

// ========== Types ==========
// مدل داده‌ای ماده درسی بر اساس subjectsData در فایل data.ts
type SubjectList = {
  id: number;
  name: string;
  teachers: string[];   // آرایه‌ای از نام معلمان
};

// ========== Table Columns ==========
const columns = [
  { header: "نام ماده درسی", accessor: "subject" },
  { header: "نام معلمان", accessor: "teachers", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" },
];

// ========== Render Row Function ==========
const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* نام ماده درسی */}
    <td className="flex items-center gap-4 p-4">{item.name}</td>

    {/* نام معلمان (تبدیل آرایه به رشته با کاما) */}
    <td className="hidden md:table-cell">{item.teachers.join("، ")}</td>

    {/* عملیات (فقط ادمین) */}
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="subject" type="update" data={item} />
            <FormModal table="subject" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

// ========== Main Component ==========
const SubjectListPage = () => {
  // استفاده مستقیم از داده استاتیک
  const data = subjectsData;
  const count = data.length;
  const page = 1; // صفحه‌بندی ساده (در صورت نیاز بعداً اضافه شود)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
            <Image src="/filter.png" width={14} height={14} alt="فیلتر" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
            <Image src="/sort.png" width={14} height={14} alt="مرتب‌سازی" />
          </button>
          {role === "admin" && <FormModal table="subject" type="create" />}
          <TableSearch />
        </div>
        <h1 className="hidden md:block text-lg font-semibold ml-auto">همه مواد درسی</h1>
      </div>

      {/* TABLE */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination page={page} count={count} />
    </div>
  );
};

export default SubjectListPage;