import React from 'react'
import Image from 'next/image'
import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/setting'
import { getUserRole } from '@/lib/utils'

// نوع داده برای نتایج (Result Type Definition)
// Defines the Result data structure
type ResultList = {
  id: number,
  title: string,
  studentName: string
  studentSurname: string
  teacherName: string
  teacherSurname: string
  score: number
  className: string
  startTime: Date;
}

// رندر هر ردیف جدول (Render each row in the table)
// Handles displaying a single Result row
const renderRow = (item: ResultList, role: string) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.studentName + " " + item.studentSurname}</td>
    <td className="hidden md:table-cell">{item.score.toLocaleString("fa-IR")}</td>
    <td className="hidden md:table-cell">{item.teacherName + " " + item.teacherSurname}</td>
    <td className="hidden md:table-cell">{item.className}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("fa-IR").format(item.startTime)}</td>
    <td>
      {/* دکمه‌های اعمال فقط برای ادمین فعال هستند */}
      {/* Actions buttons are only visible for admin */}
      <div className="flex items-center gap-2">
        {role === 'admin' && (
          <>
            <FormModal table="subject" type="update" data={item} />
            <FormModal table="subject" type="delete" id={Number(item.id)} />
          </>
        )}
      </div>
    </td>
  </tr>
)

const ResultListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const { role, currentUserId } = await getUserRole();

  // console.log(data)

  // ستون‌های جدول (Table Columns Definition)
  // Define the table columns with headers and accessors
  const columns = [
    { header: 'ماده درسی', accessor: 'title' }, // Subject
    { header: 'دانش آموز', accessor: 'student' }, // Student
    { header: 'نمره', accessor: 'score', className: 'hidden md:table-cell' }, // Score
    { header: 'معلم', accessor: 'teacher', className: 'hidden md:table-cell' }, // Teacher
    { header: 'کلاس', accessor: 'class', className: 'hidden md:table-cell' }, // Class
    { header: 'تاریخ', accessor: 'date', className: 'hidden md:table-cell' }, // Date
    ...(role === "admin" || role === "teacher" ? [{ header: 'اعمال', accessor: 'actions' }] : []) // Actions
  ]

  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ResultWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { student: { name: { contains: value, mode: "insensitive" } } }
            ]
            break;
          default:
            break;
        }
      }
    }
  }



  // ROLE CONDITIONs

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { exam: { lesson: { teacherId: currentUserId! } } },
        { assignment: { lesson: { teacherId: currentUserId! } } },
      ]
      break;

    case "student":
      query.studentId = currentUserId!;
      break;

    case "parent":
      query.student = {
        parentId: currentUserId!
      }
    default:
      break;
  }


  const [dataRes, count] = await prisma.$transaction([

    prisma.result.findMany({
      where: query,
      include: {
        student: {
          select: {
            name: true,
            surname: true
          }
        },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              }

            }
          }
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              }

            }
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.result.count({ where: query })
  ]
  );
  const data = dataRes.map((item) => {
    const assessment = item.exam || item.assignment

    if (!assessment) return null;

    const isExam = "startTime" in assessment;


    return {

      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate
    }
  });
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* بالای صفحه - فیلتر و جستجو */}
      {/* Top section - Filter and search */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            {/* دکمه فیلتر */}
            {/* Filter button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            {/* دکمه مرتب‌سازی */}
            {/* Sort button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {/* دکمه ایجاد نتیجه جدید فقط برای ادمین */}
            {/* Create new result button only for admin */}
            {(role === 'admin' || role === "teacher") && <FormModal table="subject" type="create" />}

            {/* کامپوننت جستجوی جدول */}
            {/* Table search component */}
            <TableSearch />
          </div>
        </div>

        <h1 className="hidden md:block text-lg font-semibold">همه نتایج</h1>
      </div>

      {/* جدول نتایج */}
      {/* Results Table */}
      <Table columns={columns} renderRow={(item) => renderRow(item, role)} data={data} />

      {/* صفحه‌بندی */}
      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  )
}

export default ResultListPage
