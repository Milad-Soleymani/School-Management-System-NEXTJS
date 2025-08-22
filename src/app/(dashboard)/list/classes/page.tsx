import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { classesData, role } from '@/lib/data'
import Image from 'next/image'
import React from 'react'

// ✅ Define Class type properly
type Class = {
  id: number
  name: string
  capacity: number
  grade: number
  supervisor: string[] | string // 👈 supervisor can be array OR single string
}

const columns = [
  { header: "نام کلاس", accessor: "name" },
  { header: "ظرفیت", accessor: "capacity", className: "hidden md:table-cell" },
  { header: "پایه", accessor: "grade", className: "hidden md:table-cell" },
  { header: "ناظر", accessor: "supervisor", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" }
]

const ClassListPage = () => {
  // ✅ Render each row safely
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
    >
      {/* Class name */}
      <td className="flex items-center gap-4 p-4">{item.name}</td>

      {/* Capacity */}
      <td className="hidden md:table-cell">{item.capacity}</td>

      {/* Grade */}
      <td className="hidden md:table-cell">{item.grade}</td>

      {/* Supervisor(s) - Safe rendering */}
      <td className="hidden md:table-cell">
        {Array.isArray(item.supervisor)
          ? item.supervisor.join(", ")
          : item.supervisor || "—"}
      </td>

      {/* Actions */}
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
  )

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* ---------- TOP BAR ---------- */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            {/* Filter Button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="filter" />
            </button>

            {/* Sort Button */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="sort" />
            </button>

            {/* Create Button (Admin Only) */}
            {role === "admin" && <FormModal table="subject" type="create" />}

            {/* Search */}
            <TableSearch />
          </div>
        </div>

        <h1 className="hidden md:block text-lg font-semibold">همه کلاس‌ها</h1>
      </div>

      {/* ---------- TABLE LIST ---------- */}
      <Table columns={columns} renderRow={renderRow} data={classesData} />

      {/* ---------- PAGINATION ---------- */}
      <Pagination />
    </div>
  )
}

export default ClassListPage
