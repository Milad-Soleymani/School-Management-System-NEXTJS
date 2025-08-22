// AnnouncementListPage.tsx
// صفحه لیست اطلاعیه‌ها - شامل جدول، جستجو، و امکانات CRUD
// Announcements List Page - includes table, search, and CRUD actions

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { announcementsData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";

// ==== Types ====
// مدل داده‌ای اطلاعیه
// Announcement data model
type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
};

// ==== Table Columns ====
// تعریف ستون‌های جدول
// Define table columns
const columns = [
  {
    header: "موضوع", // Title
    accessor: "title",
  },
  {
    header: "کلاس", // Class
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "تاریخ", // Date
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "اعمال", // Actions
    accessor: "actions",
  },
];

const AnnouncementListPage = () => {
  // ==== Render Row Function ====
  // تابع برای نمایش هر سطر در جدول
  // Function to render each table row
  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
    >
      {/* Title */}
      <td className="flex items-center gap-4 p-4">{item.title}</td>

      {/* Class */}
      <td>{item.class}</td>

      {/* Date */}
      <td className="hidden md:table-cell">{item.date}</td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* Edit action */}
              <FormModal table="subject" type="update" data={item} />

              {/* Delete action */}
              <FormModal table="subject" type="delete" id={item.id} />
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

            {/* Create new announcement (admin only) */}
            {role === "admin" && <FormModal table="subject" type="create" />}

            {/* Search input */}
            <TableSearch />
          </div>
        </div>

        {/* Page title */}
        <h1 className="hidden md:block text-lg font-semibold">
          همه اطلاعیه ها {/* All Announcements */}
        </h1>
      </div>

      {/* ================= LIST ================= */}
      {/* جدول اطلاعیه‌ها */}
      {/* Announcements Table */}
      <Table columns={columns} renderRow={renderRow} data={announcementsData} />

      {/* ================= PAGINATION ================= */}
      {/* صفحه‌بندی */}
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default AnnouncementListPage;
