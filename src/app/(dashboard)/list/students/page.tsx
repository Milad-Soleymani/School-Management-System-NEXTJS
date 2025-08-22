import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, studentsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// ===== Type Definition / تعریف نوع دانش‌آموز =====
type Student = {
  id: number
  studentId: string
  name: string
  email?: string
  photo: string
  phone?: string
  grade: number
  class: string
  address: string
}

// ===== Table Columns / ستون‌های جدول =====
const columns = [
  { header: 'اطلاعات', accessor: 'info' },
  { header: 'شناسه دانش آموز', accessor: 'studentId', className: 'hidden md:table-cell' },
  { header: 'پایه', accessor: 'grade', className: 'hidden md:table-cell' },
  { header: 'شماره تلفن', accessor: 'phone', className: 'hidden md:table-cell' },
  { header: 'نشانی', accessor: 'address', className: 'hidden md:table-cell text-right pr-5' },
  { header: 'اعمال', accessor: 'actions' },
]

// ===== Student List Page Component / کامپوننت صفحه لیست دانش‌آموزان =====
const StudentListPage = () => {

  // ===== Render Single Row / رندر یک ردیف جدول =====
  const renderRow = (item: Student) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight">
      {/* Info / اطلاعات دانش‌آموز */}
      <td className="flex items-center gap-4 p-4">
        <Image 
          src={item.photo} 
          width={40} 
          height={40} 
          alt={item.name} 
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover" 
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>

      {/* Student ID / شناسه دانش‌آموز */}
      <td className="hidden md:table-cell">{item.studentId}</td>

      {/* Grade / پایه */}
      <td className="hidden md:table-cell">{item.grade}</td>

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
      <Table columns={columns} renderRow={renderRow} data={studentsData} />

      {/* Pagination / صفحه‌بندی */}
      <Pagination />
    </div>
  )
}

export default StudentListPage
