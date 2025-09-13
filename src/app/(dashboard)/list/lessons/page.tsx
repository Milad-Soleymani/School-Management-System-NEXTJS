import React from 'react'
import Image from 'next/image'
import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { lessonsData, role } from '@/lib/data'
import { Class, Lesson, Prisma, Subject, Teacher } from '@prisma/client'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/setting'

// نوع داده‌ی هر درس / Type definition for a lesson
type LessonList = Lesson & { subject: Subject } & { class: Class } & { teacher: Teacher };

// تعریف ستون‌های جدول / Table column definitions
const columns = [
  { header: "نام کلاس", accessor: "subject" }, // عنوان ستون / Column title
  { header: "کلاس", accessor: "class", className: "hidden md:table-cell" },
  { header: "معلم", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" }
]

const renderRow = (item: LessonList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight">

    {/* نام درس / Lesson name */}
    <td className="flex items-center gap-4 p-4">
      {item.subject.name}
    </td>

    {/* کلاس درس / Class */}
    <td>{item.class.name}</td>

    {/* معلم درس / Teacher */}
    <td className="hidden md:table-cell">{item.teacher.name + " " + item.teacher.surname}</td>

    {/* دکمه‌های اعمال / Action buttons */}
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table='subject' type='update' data={item} /> {/* ویرایش / Edit */}
            <FormModal table='subject' type='delete' id={item.id} /> {/* حذف / Delete */}
          </>
        )}
      </div>
    </td>

  </tr>
)
const LessonListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  // console.log(data)

  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.LessonWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: 'insensitive' } } },
              { teacher: { name: { contains: value, mode: 'insensitive' } } },
            ]
            break;
          default:
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.lesson.count({ where: query })
  ]
  )




  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

      {/* بالای جدول / Top controls */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">

          {/* دکمه‌های فیلتر، مرتب‌سازی و ایجاد / Filter, Sort & Create buttons */}
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src='/filter.png' width={14} height={14} alt='فیلتر' />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src='/sort.png' width={14} height={14} alt='مرتب‌سازی' />
            </button>

            {/* دکمه ایجاد درس برای ادمین / Create lesson button for admin */}
            {role === 'admin' && <FormModal table='subject' type='create' />}

            {/* جستجوی جدول / Table search */}
            <TableSearch />
          </div>
        </div>

        {/* عنوان صفحه / Page title */}
        <h1 className="hidden md:block text-lg font-semibold">همه دروس</h1>
      </div>

      {/* جدول دروس / Lessons table */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* صفحه‌بندی / Pagination */}
      <Pagination page={p} count={count} />
    </div>
  )
}

export default LessonListPage
