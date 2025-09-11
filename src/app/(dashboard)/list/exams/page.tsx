import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { examsData, role } from '@/lib/data';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/setting';
import { Class, Exam, Prisma, Subject, Teacher } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

// ==============================
// Type Definition | تعریف نوع داده
// ==============================
type ExamList = Exam & {
  lesson: {
    subject: Subject,
    class: Class,
    teacher: Teacher
  }
}

// ==============================
// Table Columns | ستون‌های جدول
// ==============================
const columns = [
  { header: "ماده درسی ", accessor: "subject" },
  { header: "کلاس ", accessor: "class", className: "hidden md:table-cell" },
  { header: "معلم ", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "تاریخ ", accessor: "date", className: "hidden md:table-cell" },
  { header: "اعمال ", accessor: "actions" },
];

// ==============================
// Render Row Function
// تابع رندر هر سطر جدول
// ==============================
const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* Subject | ماده درسی */}
    <td className="flex items-center gap-4 p-4">
      {item.lesson.subject.name}
    </td>

    {/* Class | کلاس */}
    <td>{item.lesson.class.name}</td>

    {/* Teacher | معلم */}
    <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>

    {/* Date | تاریخ */}
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("fa-IR").format(item.startTime)}</td>

    {/* Actions | عملیات */}
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

// ==============================
// Exam List Page Component
// صفحه لیست امتحانات
// ==============================
const ExamListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  // console.log(data)

  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ExamWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = { classId: parseInt(value) };
            break;
          case "teacherId":
            query.lesson = {
              teacherId: value,
            }
            break;
          case "search":
            query.lesson = {
              subject: {
                name: { contains: value, mode: "insensitive" }
              }
            }
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.exam.count({ where: query })
  ]
  )


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
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* -------------------- */}
      {/* PAGINATION | صفحه‌بندی */}
      {/* -------------------- */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ExamListPage;
