import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FormModal from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { Class, Prisma, Subject, Teacher } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/setting';
import { getUserRole } from '@/lib/utils';

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] }


const renderRow = (item: TeacherList, role: string) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight'>
    <td className='flex items-center gap-4 p-4'>
      <Image src={item.img || "/noAvatar.png"} width={40} height={40} alt='' className='md:hidden xl:block w-10 h-10 rounded-full object-cover' />
      <div className="flex flex-col">
        <h3 className='font-semibold'>{item.name}</h3>
        <p className='text-xs text-gray-500'>{item?.email}</p>
      </div>
    </td>
    <td className='hidden md:table-cell'>{item.username}</td>
    <td className='hidden md:table-cell'>{item.subjects.map(subject => subject.name).join(', ')}</td>
    <td className='hidden md:table-cell'>{item.classes.map(classItem => classItem.name).join(', ')}</td>
    <td className='hidden md:table-cell'>{item.phone}</td>
    <td className='hidden md:table-cell text-right pr-5'>{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-blueSky'>
            <Image src='/view.png' alt='' width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && <FormModal table='teacher' type='delete' id={item.id} />}
      </div>
    </td>
  </tr>
);

const TeacherListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

    const {role} = await getUserRole();
  
  // console.log(data)

const columns = [
  { header: "اطلاعات", accessor: "info" },
  { header: "شناسه معلم", accessor: "teacherId", className: "hidden md:table-cell" },
  { header: "دروس", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "کلاس ها", accessor: "classes", className: "hidden md:table-cell" },
  { header: "شماره تلفن", accessor: "phone", className: "hidden md:table-cell" },
  { header: "نشانی", accessor: "address", className: "hidden md:table-cell text-right pr-5" },
  ...(role === "admin" ?[{ header: 'اعمال', accessor: 'actions' }] : []),
];
  const params = await searchParams;
  console.log(params);

  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.TeacherWhereInput = {};

  // ! URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {

        switch (key) {
          case "classId":
            query.lessons = { some: { classId: parseInt(value) } }
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" }
            break;
          default:
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.teacher.count({ where: query })
  ]
  )
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>

      {/* بالای صفحه: دکمه‌ها و سرچ سمت چپ، عنوان سمت راست */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow'>
            <Image src='/filter.png' width={14} height={14} alt='فیلتر' />
          </button>
          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow'>
            <Image src='/sort.png' width={14} height={14} alt='مرتب‌سازی' />
          </button>
          {role === "admin" && <FormModal table='teacher' type='create' />}
          <TableSearch />
        </div>

        <h1 className='hidden md:block text-lg font-semibold ml-auto'>همه معلمان</h1>
      </div>

      {/* جدول */}
      <Table columns={columns} renderRow={(item) => renderRow(item, role)} data={data} />

      {/* صفحه‌بندی */}
      <Pagination page={p} count={count} />

    </div>
  );
};

export default TeacherListPage;
