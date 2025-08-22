import React from 'react'
import Image from 'next/image'
import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { lessonsData, role } from '@/lib/data'

// نوع داده‌ی هر درس / Type definition for a lesson
type Lesson = {
  id: number
  subject: string
  class: string
  teacher: string
}

// تعریف ستون‌های جدول / Table column definitions
const columns = [
  { header: "نام کلاس", accessor: "subject" }, // عنوان ستون / Column title
  { header: "کلاس", accessor: "class", className: "hidden md:table-cell" },
  { header: "معلم", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" }
]

const LessonListPage = () => {

  /**
   * رندر یک ردیف جدول / Render a single table row
   * @param item - اطلاعات درس / Lesson data
   */
  const renderRow = (item: Lesson) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight">
      
      {/* نام درس / Lesson name */}
      <td className="flex items-center gap-4 p-4">
        {item.subject}
      </td>

      {/* کلاس درس / Class */}
      <td>{item.class}</td>

      {/* معلم درس / Teacher */}
      <td className="hidden md:table-cell">{item.teacher}</td>

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
      <Table columns={columns} renderRow={renderRow} data={lessonsData} />

      {/* صفحه‌بندی / Pagination */}
      <Pagination />
    </div>
  )
}

export default LessonListPage
