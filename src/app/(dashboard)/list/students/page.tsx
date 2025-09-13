import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, studentsData } from '@/lib/data'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/setting'
import { Class, Prisma, Student } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// ===== Type Definition / تعریف نوع دانش‌آموز =====
type StudentList = Student & { class: Class }
// ===== Table Columns / ستون‌های جدول =====
const columns = [
  { header: 'اطلاعات', accessor: 'info' },
  { header: 'شناسه دانش آموز', accessor: 'studentId', className: 'hidden md:table-cell' },
  { header: 'پایه', accessor: 'grade', className: 'hidden md:table-cell' },
  { header: 'شماره تلفن', accessor: 'phone', className: 'hidden md:table-cell' },
  { header: 'نشانی', accessor: 'address', className: 'hidden md:table-cell text-right pr-5' },
  { header: 'اعمال', accessor: 'actions' },
]


// ===== Render Single Row / رندر یک ردیف جدول =====
const renderRow = (item: StudentList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight">
    {/* Info / اطلاعات دانش‌آموز */}
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        width={40}
        height={40}
        alt={item.name}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.class.name}</p>
      </div>
    </td>

    {/* Student ID / شناسه دانش‌آموز */}
    <td className="hidden md:table-cell">{item.username}</td>

    {/* Grade / پایه */}
    <td className="hidden md:table-cell">{item.class.name[0]}</td>

    {/* Phone / شماره تلفن */}
    <td className="hidden md:table-cell">{item.phone}</td>

    {/* Address / نشانی */}
    <td className="hidden md:table-cell text-right pr-5">{item.address}</td>

    {/* Actions / اعمال */}
    <td>
      <div className="flex items-center gap-2">
        {/* View Button / دکمه مشاهده */}
        <Link href={`/list/students/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blueSky">
            <Image src="/view.png" alt="View" width={16} height={16} />
          </button>
        </Link>

        {/* Delete Button for Admin Only / دکمه حذف فقط برای مدیر */}
        {role === 'admin' && <FormModal table="student" type="delete" id={item.id} />}
      </div>
    </td>
  </tr>
)
// ===== Student List Page Component / کامپوننت صفحه لیست دانش‌آموزان =====
const StudentListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  // console.log(data)

  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.StudentWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {

        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value
                }
              }
            }
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
            
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.student.count({ where: query })
  ]
  )
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

      {/* TOP Section / بخش بالایی */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            {/* Filter Button / دکمه فیلتر */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            {/* Sort Button / دکمه مرتب‌سازی */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {/* Create Button for Admin / دکمه ایجاد فقط برای مدیر */}
            {role === 'admin' && <FormModal table="student" type="create" />}

            {/* Table Search / جستجوی جدول */}
            <TableSearch />
          </div>
        </div>

        <h1 className="hidden md:block text-lg font-semibold">همه دانش‌آموزان</h1>
      </div>

      {/* Table / جدول */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* Pagination / صفحه‌بندی */}
      <Pagination page={p} count={count} />
    </div>
  )
}

export default StudentListPage
