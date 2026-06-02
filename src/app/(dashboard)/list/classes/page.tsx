
import FormContainer from '@/components/forms/FormContainer'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/setting'
import { getUserRole } from '@/lib/utils'
import { Class, Grade, Prisma, Teacher } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type ClassList = Class & {
  supervisor: Teacher | null
  grade: Grade
}

const renderRow = (item: ClassList, role: string) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    {/* نام کلاس */}
    <td className="flex items-center gap-4 p-4">
      {item.name}
    </td>

    {/* ظرفیت */}
    <td className="hidden sm:table-cell">
      {item.capacity}
    </td>

    {/* پایه */}
    <td className="md:table-cell">
      {item.grade.level}
    </td>

    {/* ناظر */}
    <td className="hidden md:table-cell">
      {item.supervisor
        ? `${item.supervisor.name} ${item.supervisor.surname}`
        : "-"}
    </td>

    {/* عملیات */}
    <td>
      <div className="flex items-center gap-2 justify-center">
        {role === "admin" && (
          <>
            <FormContainer
              table="class"
              type="update"
              data={item}
            />
            <FormContainer
              table="class"
              type="delete"
              id={item.id}
            />
          </>
        )}
      </div>
    </td>
  </tr>
)

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {
  const { role } = await getUserRole()

  const columns = [
    { header: "نام کلاس", accessor: "name" },
    {
      header: "ظرفیت",
      accessor: "capacity",
      className: "hidden sm:table-cell",
    },
    {
      header: "پایه",
      accessor: "grade",
      className: "md:table-cell",
    },
    {
      header: "ناظر",
      accessor: "supervisor",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "اعمال",
            accessor: "actions",
            className: "text-center",
          },
        ]
      : []),
  ]

  const params = await searchParams

  const { page, ...queryParams } = params
  const p = page ? parseInt(page) : 1

  const query: Prisma.ClassWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value
            break

          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            }
            break

          default:
            break
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
        grade: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),

    prisma.class.count({
      where: query,
    }),
  ])

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image
                src="/filter.png"
                width={14}
                height={14}
                alt="filter"
              />
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image
                src="/sort.png"
                width={14}
                height={14}
                alt="sort"
              />
            </button>

            {role === "admin" && (
              <FormContainer
                table="class"
                type="create"
              />
            )}

            <TableSearch />
          </div>
        </div>

        <h1 className="hidden md:block text-lg font-semibold">
          همه کلاس‌ها
        </h1>
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        renderRow={(item) => renderRow(item, role)}
        data={data}
      />

      {/* PAGINATION */}
      <Pagination
        page={p}
        count={count}
      />
    </div>
  )
}

export default ClassListPage

