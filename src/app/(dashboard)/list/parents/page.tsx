import React from 'react';
import Image from 'next/image';
import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { Parent, Prisma, Student } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/setting';
import { getUserRole } from '@/lib/utils';

// تعریف نوع داده برای والدین
type ParentList = Parent & { students: Student[] }


// رندر هر ردیف جدول
const renderRow = (item: ParentList, role: string) => {
  // بررسی اینکه students آرایه باشد قبل از join
  const studentsList = Array.isArray(item.students) ? item.students.join(', ') : "";

  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
    >
      {/* اطلاعات والد */}
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          {item.email && <p className="text-xs text-gray-500">{item.email}</p>}
        </div>
      </td>

      {/* نام دانش‌آموزان */}
      <td className="hidden md:table-cell">{item.students.map(student => student.name).join(",")}</td>

      {/* شماره تلفن */}
      <td className="hidden md:table-cell">{item.phone}</td>

      {/* نشانی */}
      <td className="hidden md:table-cell text-right p-2">{item.address}</td>

      {/* اعمال */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={Number(item.id)} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
const ParentListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const { role, currentUserId } = await getUserRole();


  // console.log(data)

  
// تعریف ستون‌های جدول
const columns = [
  { header: "اطلاعات", accessor: "info" },
  { header: "نام دانش‌آموزان", accessor: "students", className: "hidden md:table-cell" },
  { header: "شماره تلفن", accessor: "phone", className: "hidden md:table-cell" },
  { header: "نشانی", accessor: "address", className: "hidden md:table-cell text-right pr-5" },
  ...(role === "admin" ? [{ header: "اعمال", accessor: "actions" }] : []),
];

  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ParentWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {

        switch (key) {         
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

    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.parent.count({ where: query })
  ]
  )


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* بالای صفحه: دکمه‌ها و جستجو */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {/* دکمه ایجاد والد جدید */}
            {role === "admin" && <FormModal table="parent" type="create" />}

            {/* جستجو */}
            <TableSearch />
          </div>
        </div>

        {/* عنوان صفحه */}
        <h1 className="hidden md:block text-lg font-semibold">همه والدین</h1>
      </div>

      {/* جدول لیست والدین */}
      <Table columns={columns} renderRow={(item) => renderRow(item, role)} data={data} />

      {/* صفحه‌بندی */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ParentListPage;
