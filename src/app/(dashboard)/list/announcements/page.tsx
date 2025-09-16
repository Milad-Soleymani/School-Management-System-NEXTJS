// AnnouncementListPage.tsx
// صفحه لیست اطلاعیه‌ها - شامل جدول، جستجو، و امکانات CRUD
// Announcements List Page - includes table, search, and CRUD actions

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUserRole } from "@/lib/utils";
import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";
import React from "react";

// ==== Types ====
// مدل داده‌ای اطلاعیه
type AnnouncementList = Announcement & { class: Class };

// ==== تابع رندر هر سطر ====
// خارج از کامپوننت، role به عنوان آرگومان داده می‌شود
const renderRow = (item: AnnouncementList, role: string) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("fa-IR").format(item.date)}
    </td>
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

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // ==== دریافت رول کاربر ====
  const role = await getUserRole(); // رول کاربر را می‌گیریم
  // ==== ستون‌های جدول ====
  const columns = [
    { header: "موضوع", accessor: "title" },
    { header: "کلاس", accessor: "class", className: "hidden md:table-cell" },
    { header: "تاریخ", accessor: "date", className: "hidden md:table-cell" },
    ...(role === "admin" ? [{ header: "اعمال", accessor: "actions" }] : []),
  ];

  // ==== دریافت پارامترهای URL ====
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.AnnouncementWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  // ==== گرفتن داده‌ها از دیتابیس ====
  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: { class: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* ================= TOP BAR ================= */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>
            {role === "admin" && <FormModal table="subject" type="create" />}
            <TableSearch />
          </div>
        </div>
        <h1 className="hidden md:block text-lg font-semibold">
          همه اطلاعیه‌ها
        </h1>
      </div>

      {/* ================= LIST ================= */}
      <Table
        columns={columns}
        renderRow={(item) => renderRow(item, role)}
        data={data}
      />

      {/* ================= PAGINATION ================= */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AnnouncementListPage;
