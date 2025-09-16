// AssignmentListPage.tsx
// صفحه لیست تکالیف - نمایش تکالیف همراه با جستجو، مرتب‌سازی و CRUD
// Assignments List Page - shows assignments with search, sorting, and CRUD actions

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUserRole } from "@/lib/utils";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import React from "react";

// ==== Types ====
// مدل داده‌ای تکلیف
// Assignment data model
type AssignmentList = Assignment & {
  lesson: {
    subject: Subject,
    class: Class,
    teacher: Teacher
  }
}

// ==== Render Row Function ====
// تابع برای نمایش هر سطر از جدول
// Function to render each row in the table
const renderRow = (item: AssignmentList, role: string) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* Subject */}
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>

    {/* Class */}
    <td>{item.lesson.class.name}</td>

    {/* Teacher */}
    <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>

    {/* Due Date */}
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("fa-IR").format(item.dueDate)}</td>

    {/* Actions */}
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AssignmentListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

  // console.log(data)
  const role = await getUserRole();

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
    ...(role === "admin" ? [{ header: "اعمال", accessor: "actions" }] : []),

  ];
  const params = searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.AssignmentWhereInput = {};

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

          default:
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.assignment.findMany({
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
    prisma.assignment.count({ where: query })
  ]
  )

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
      <Table
        columns={columns}
        renderRow={(item) => renderRow(item, role)}
        data={data}
      />
      {/* ================= PAGINATION ================= */}
      {/* صفحه‌بندی */}
      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AssignmentListPage;
