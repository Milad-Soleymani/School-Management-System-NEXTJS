import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { examsData, role } from '@/lib/data';
import Image from 'next/image';
import React from 'react';

// ==============================
// Type Definition | تعریف نوع داده
// ==============================
type Exam = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

// ==============================
// Table Columns | ستون‌های جدول
// ==============================
const columns = [
  { header: "ماده درسی | Subject", accessor: "subject" },
  { header: "کلاس | Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "معلم | Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "تاریخ | Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "اعمال | Actions", accessor: "actions" },
];

// ==============================
// Exam List Page Component
// صفحه لیست امتحانات
// ==============================
const ExamListPage = () => {

  // ==============================
  // Render Row Function
  // تابع رندر هر سطر جدول
  // ==============================
  const renderRow = (exam: Exam) => (
    <tr
      key={exam.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
    >
      {/* Subject | ماده درسی */}
      <td className="flex items-center gap-4 p-4">
        {exam.subject}
      </td>

      {/* Class | کلاس */}
      <td>{exam.class}</td>

      {/* Teacher | معلم */}
      <td className="hidden md:table-cell">{exam.teacher}</td>

      {/* Date | تاریخ */}
      <td className="hidden md:table-cell">{exam.date}</td>

      {/* Actions | عملیات */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={exam} />
              <FormModal table="subject" type="delete" id={exam.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // ==============================
  // Page Return | خروجی صفحه
  // ==============================
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      
      {/* -------------------- */}
      {/* TOP SECTION | بخش بالا */}
      {/* -------------------- */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            
            {/* Filter Button | دکمه فیلتر */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            {/* Sort Button | دکمه مرتب‌سازی */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {/* Create New Exam | ایجاد امتحان جدید */}
            {role === "admin" && <FormModal table="subject" type="create" />}

            {/* Search | جستجو */}
            <TableSearch />
          </div>
        </div>

        {/* Title | عنوان صفحه */}
        <h1 className="hidden md:block text-lg font-semibold">همه امتحانات</h1>
      </div>

      {/* -------------------- */}
      {/* LIST SECTION | لیست امتحانات */}
      {/* -------------------- */}
      <Table columns={columns} renderRow={renderRow} data={examsData} />

      {/* -------------------- */}
      {/* PAGINATION | صفحه‌بندی */}
      {/* -------------------- */}
      <Pagination />
    </div>
  );
};

export default ExamListPage;
