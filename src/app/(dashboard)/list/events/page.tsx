// 📌 Event List Page
// -----------------------------
// English: This page displays a list of events in a table with actions (CRUD).
// فارسی: این صفحه لیست رویدادها را در قالب جدول همراه با عملیات (CRUD) نمایش می‌دهد.

import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { eventsData, role } from '@/lib/data'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/setting'
import { Class, Event, Prisma } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

// 📌 Type definition for Event object
// فارسی: تعریف نوع داده رویداد
type EventList = Event & {class: Class}

// 📌 Table Columns Configuration
// فارسی: تنظیمات ستون‌های جدول
const columns = [
  { header: "موضوع", accessor: "title" },
  { header: "کلاس", accessor: "class", className: "hidden md:table-cell" },
  { header: "تاریخ", accessor: "date", className: "hidden md:table-cell" },
  { header: "زمان شروع", accessor: "startTime", className: "hidden md:table-cell" },
  { header: "زمان پایان", accessor: "endTime", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" }
]
// 📌 Render a single row of the table
// فارسی: رندر کردن یک ردیف جدول
const renderRow = (item: EventList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* Event Title */}
    {/* فارسی: عنوان رویداد */}
    <td className="flex items-center gap-4 p-4">{item.title}</td>

    {/* Class */}
    <td>{item.class.name}</td>

    {/* Date */}
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("fa-IR").format(item.startTime)}</td>

    {/* Start Time */}
    <td className="hidden md:table-cell">{item.startTime.toLocaleTimeString("fa-IR",{
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })}</td>

    {/* End Time */}
    <td className="hidden md:table-cell">{item.endTime.toLocaleTimeString("fa-IR",{
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })}</td>

    {/* Actions */}
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            {/* Update Event */}
            <FormModal table="event" type="update" data={item} />

            {/* Delete Event */}
            <FormModal table="event" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
)

const EventListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  // console.log(data)

  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.EventWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {

        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" }
            break;
          default:
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.event.findMany({
      where: query,
      include: {
        class: true
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.event.count({ where: query })
  ]
  )


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* 📌 TOP BAR */}
      {/* فارسی: نوار بالای صفحه */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">

            {/* Filter Button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            {/* Sort Button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {/* Create Event (Only for Admin) */}
            {role === "admin" && <FormModal table="event" type="create" />}

            {/* Search Component */}
            <TableSearch />
          </div>
        </div>

        {/* Page Title */}
        <h1 className="hidden md:block text-lg font-semibold">همه رویدادها</h1>
      </div>

      {/* 📌 EVENTS TABLE */}
      {/* فارسی: جدول رویدادها */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* 📌 PAGINATION */}
      {/* فارسی: صفحه‌بندی */}
      <Pagination page={p} count={count}/>
    </div>
  )
}

export default EventListPage
