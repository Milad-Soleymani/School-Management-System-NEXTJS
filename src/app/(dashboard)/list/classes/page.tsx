import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { classesData, role } from '@/lib/data'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/setting'
import { Class, Prisma, Teacher } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

// ✅ Define Class type properly
type ClassList = Class & { supervisor: Teacher }
const columns = [
  { header: "نام کلاس", accessor: "name" },
  { header: "ظرفیت", accessor: "capacity", className: "hidden md:table-cell" },
  { header: "پایه", accessor: "grade", className: "hidden md:table-cell" },
  { header: "ناظر", accessor: "supervisor", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" }
]

// ✅ Render each row safely
const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* Class name */}
    <td className="flex items-center gap-4 p-4">{item.name}</td>

    {/* Capacity */}
    <td className="hidden md:table-cell">{item.capacity}</td>

    {/* Name */}
    <td className="hidden md:table-cell">{item.name[0]}</td>

    {/* Supervisor(s) - Safe rendering */}
    <td className="hidden md:table-cell">{item.supervisor.name + " " + item.supervisor.surname}</td>

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
const ClassListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  // console.log(data)

  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ClassWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {

        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.class.count({ where: query })
  ]
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
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* ---------- PAGINATION ---------- */}
      <Pagination page={p} count={count} />
    </div>
  )
}

export default ClassListPage
