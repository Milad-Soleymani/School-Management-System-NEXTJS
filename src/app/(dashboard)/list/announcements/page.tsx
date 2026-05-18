// AnnouncementListPage.tsx
// صفحه لیست اطلاعیه‌ها - با داده استاتیک (بدون دیتابیس)
// Announcements List Page - using static data (no database)

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { announcementsData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";

// ========== Types ==========
// مدل داده‌ای اطلاعیه از فایل موقت (static data)
// Announcement data model from temporary file
type AnnouncementList = {
  id: number;
  title: string;
  class: { name: string };
  date: Date | string; // ممکن است از نوع Date یا string باشد
};

// ========== Helper function for safe date formatting ==========
// تابع کمکی برای فرمت امن تاریخ
// اگر تاریخ نامعتبر باشد، عبارت "نامعتبر" نمایش داده می‌شود
const formatDateSafe = (dateValue: Date | string | undefined): string => {
  if (!dateValue) return "نامعتبر";
  
  // تبدیل به شیء Date
  const dateObj = new Date(dateValue);
  
  // بررسی اعتبار (اگر تاریخ معتبر نباشد)
  if (isNaN(dateObj.getTime())) return "نامعتبر";
  
  // نمایش تاریخ به شمسی (با استفاده از locale fa-IR)
  return new Intl.DateTimeFormat("fa-IR").format(dateObj);
};

// ========== Table Columns ==========
// تعریف ستون‌های جدول
const columns = [
  { header: "موضوع", accessor: "title" },
  { header: "کلاس", accessor: "class", className: "hidden md:table-cell" },
  { header: "تاریخ", accessor: "date", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" },
];

// ========== Render Row Function ==========
// تابع نمایش هر سطر در جدول
const renderRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* عنوان اطلاعیه */}
    <td className="p-4">{item.title}</td>

    {/* نام کلاس */}
    <td className="hidden md:table-cell">{item.class.name}</td>

    {/* تاریخ با فرمت ایمن */}
    <td className="hidden md:table-cell">
      {formatDateSafe(item.date)}
    </td>

    {/* دکمه‌های عملیات (فقط برای ادمین) */}
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
// کامپوننت اصلی صفحه لیست اطلاعیه‌ها
const AnnouncementListPage = () => {
  // استفاده مستقیم از داده‌های استاتیک (فایل موقت)
  const data = announcementsData;
  const count = data.length;
  const page = 1; // صفحه‌بندی ساده - در صورت نیاز می‌توان با useState و فیلتر کردن سمت کلاینت پیشرفته‌تر کرد

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* ===== TOP BAR ===== */}
      {/* نوار بالا شامل دکمه‌های فیلتر، مرتب‌سازی، ایجاد و جستجو */}
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

            {/* دکمه ایجاد اطلاعیه جدید (فقط ادمین) */}
            {role === "admin" && <FormModal table="subject" type="create" />}

            {/* جستجو */}
            <TableSearch />
          </div>
        </div>

        {/* عنوان صفحه */}
        <h1 className="hidden md:block text-lg font-semibold">
          همه اطلاعیه‌ها
        </h1>
      </div>

      {/* ===== TABLE ===== */}
      {/* جدول نمایش اطلاعیه‌ها */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* ===== PAGINATION ===== */}
      {/* صفحه‌بندی (فعلاً ساده) */}
      <Pagination page={page} count={count} />
    </div>
  );
};

export default AnnouncementListPage;