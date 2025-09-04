import React from 'react'
import Image from 'next/image'
import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { resultsData, role } from '@/lib/data'

// نوع داده برای نتایج (Result Type Definition)
// Defines the Result data structure
type Result = {
  id: number
  subject: string
  class: string
  teacher: string
  student: string
  type: string  //'exam' | 'assignment' هنگام متصل شدن با دیتابیس به این مقدار تغییر می کند  
  date: string
  score: number
}

// ستون‌های جدول (Table Columns Definition)
// Define the table columns with headers and accessors
const columns = [
  { header: 'ماده درسی', accessor: 'subject' }, // Subject
  { header: 'دانش آموز', accessor: 'student' }, // Student
  { header: 'نمره', accessor: 'score', className: 'hidden md:table-cell' }, // Score
  { header: 'معلم', accessor: 'teacher', className: 'hidden md:table-cell' }, // Teacher
  { header: 'کلاس', accessor: 'class', className: 'hidden md:table-cell' }, // Class
  { header: 'تاریخ', accessor: 'date', className: 'hidden md:table-cell' }, // Date
  { header: 'اعمال', accessor: 'actions' } // Actions
]

const ResultListPage = () => {
  // رندر هر ردیف جدول (Render each row in the table)
  // Handles displaying a single Result row
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        {/* دکمه‌های اعمال فقط برای ادمین فعال هستند */}
        {/* Actions buttons are only visible for admin */}
        <div className="flex items-center gap-2">
          {role === 'admin' && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  )

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
            {role === 'admin' && <FormModal table="subject" type="create" />}

            {/* کامپوننت جستجوی جدول */}
            {/* Table search component */}
            <TableSearch />
          </div>
        </div>

        <h1 className="hidden md:block text-lg font-semibold">همه نتایج</h1>
      </div>

      {/* جدول نتایج */}
      {/* Results Table */}
      <Table columns={columns} renderRow={renderRow} data={resultsData} />

      {/* صفحه‌بندی */}
      {/* Pagination */}
      <Pagination />
    </div>
  )
}

export default ResultListPage
