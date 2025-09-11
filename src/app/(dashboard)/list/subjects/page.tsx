import React from 'react';
import Image from 'next/image';
import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { role, subjectsData } from '@/lib/data';
import { Prisma, Subject, Teacher } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/setting';

type SubjectList = Subject & {teachers: Teacher[]}

// ستون‌های جدول
const columns = [
  { header: "نام ماده درسی", accessor: "subject" },
  { header: "نام معلمان", accessor: "teachers", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" },
];

// رندر هر ردیف جدول
const renderRow = (item: SubjectList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight">
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">{item.teachers.map(teacher => teacher.name).join(', ')}</td>
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
);

const SubjectListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  // console.log(data)

  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.SubjectWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {

        switch (key) {         
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.subject.count({ where: query })
  ]
  )



  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

      {/* بالای صفحه: دکمه‌ها + سرچ سمت چپ و عنوان سمت راست */}
      <div className="flex flex-wrap justify-between items-center mb-4">

        {/* دکمه‌ها و سرچ بار سمت چپ */}
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
            <Image src="/filter.png" width={14} height={14} alt="فیلتر" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
            <Image src="/sort.png" width={14} height={14} alt="مرتب‌سازی" />
          </button>
          {role === "admin" && <FormModal table="subject" type="create" />}
          <TableSearch />
        </div>

        {/* عنوان سمت راست */}
        <h1 className="hidden md:block text-lg font-semibold ml-auto">همه مواد درسی</h1>
      </div>

      {/* جدول لیست */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* صفحه‌بندی */}
      <Pagination page={p} count={count} />

    </div>
  );
};

export default SubjectListPage;
