// ParentListPage.tsx
// صفحه لیست والدین - با داده استاتیک (بدون دیتابیس)

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { parentsData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";

// ========== Types ==========
type ParentList = {
  id: number;
  name: string;
  students: string[];   // آرایه‌ای از نام دانش‌آموزان
  email: string;
  phone: string;
  address: string;
};

// ========== Table Columns ==========
const columns = [
  { header: "اطلاعات", accessor: "info" },
  { header: "نام دانش‌آموزان", accessor: "students", className: "hidden md:table-cell" },
  { header: "شماره تلفن", accessor: "phone", className: "hidden md:table-cell" },
  { header: "نشانی", accessor: "address", className: "hidden md:table-cell text-right pr-5" },
  { header: "اعمال", accessor: "actions" },
];

// ========== Render Row Function ==========
const renderRow = (item: ParentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* اطلاعات والد */}
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        {item.email && <p className="text-xs text-gray-500">{item.email}</p>}
      </div>
    </td>

    {/* نام دانش‌آموزان (تبدیل آرایه به رشته با کاما) */}
    <td className="hidden md:table-cell">{item.students.join("، ")}</td>

    {/* شماره تلفن */}
    <td className="hidden md:table-cell">{item.phone}</td>

    {/* نشانی */}
    <td className="hidden md:table-cell text-right p-2">{item.address}</td>

    {/* عملیات (فقط ادمین) */}
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="parent" type="update" data={item} />
            <FormModal table="parent" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

// ========== Main Component ==========
const ParentListPage = () => {
  const data = parentsData;
  const count = data.length;
  const page = 1; // صفحه‌بندی ساده (در صورت نیاز بعداً اضافه شود)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>
            {role === "admin" && <FormModal table="parent" type="create" />}
            <TableSearch />
          </div>
        </div>
        <h1 className="hidden md:block text-lg font-semibold">همه والدین</h1>
      </div>

      {/* TABLE */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination page={page} count={count} />
    </div>
  );
};

export default ParentListPage;