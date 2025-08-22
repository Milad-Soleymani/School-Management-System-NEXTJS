// AssignmentListPage.tsx
// صفحه لیست تکالیف - نمایش تکالیف همراه با جستجو، مرتب‌سازی و CRUD
// Assignments List Page - shows assignments with search, sorting, and CRUD actions

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";

// ==== Types ====
// مدل داده‌ای تکلیف
// Assignment data model
type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

// ==== Table Columns ====
// تعریف ستون‌های جدول تکالیف
// Define table columns for assignments
const columns = [
  {
    header: "ماده درسی", // Subject
    accessor: "subject",
  },
  {
    header: "کلاس", // Class
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "معلم", // Teacher
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "مهلت", // Due Date
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "اعمال", // Actions
    accessor: "actions",
  },
];

const AssignmentListPage = () => {
  // ==== Render Row Function ====
  // تابع برای نمایش هر سطر از جدول
  // Function to render each row in the table
  const renderRow = (item: Assignment) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
    >
      {/* Subject */}
      <td className="flex items-center gap-4 p-4">{item.subject}</td>

      {/* Class */}
      <td>{item.class}</td>

      {/* Teacher */}
      <td className="hidden md:table-cell">{item.teacher}</td>

      {/* Due Date */}
      <td className="hidden md:table-cell">{item.dueDate}</td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* Update Assignment */}
              <FormModal table="assignment" type="update" data={item} />

              {/* Delete Assignment */}
              <FormModal table="assignment" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* ================= TOP BAR ================= */}
      {/* نوار بالا شامل دکمه‌های فیلتر، مرتب‌سازی، ایجاد و جستجو */}
      {/* Top bar includes filter, sort, create, and search */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            {/* Filter button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            {/* Sort button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {/* Create new assignment (admin only) */}
            {role === "admin" && <FormModal table="assignment" type="create" />}

            {/* Search input */}
            <TableSearch />
          </div>
        </div>

        {/* Page title */}
        <h1 className="hidden md:block text-lg font-semibold">
          همه تکالیف {/* All Assignments */}
        </h1>
      </div>

      {/* ================= LIST ================= */}
      {/* جدول تکالیف */}
      {/* Assignments Table */}
      <Table columns={columns} renderRow={renderRow} data={assignmentsData} />

      {/* ================= PAGINATION ================= */}
      {/* صفحه‌بندی */}
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default AssignmentListPage;
