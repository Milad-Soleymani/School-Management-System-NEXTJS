import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, teachersData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
}

const columns = [
  {
    header: "اطلاعات",
    accessor: "info"
  }, {
    header: "شناسه معلم",
    accessor: "teacherId",
    className: "hidden md:table-cell"
  }, {
    header: "دروس",
    accessor: "subjects",
    className: "hidden md:table-cell"
  }, {
    header: "کلاس ها",
    accessor: "classes",
    className: "hidden md:table-cell"
  }, {
    header: "شماره تلفن",
    accessor: "phone",
    className: "hidden md:table-cell"
  }, {
    header: "نشانی",
    accessor: "address",
    className: "hidden md:table-cell"
  }, {
    header: "اعمال",
    accessor: "actions",
  }

]

const TeacherListPage = () => {

  const renderRow = (item:Teacher) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight'>
      <td className='flex items-center gap-4 p-4'>
        <Image src={item.photo} width={40} height={40} alt='' className='md:hidden xl:block w-10 h-10 rounded-full object-cover'/>
      <div className="flex flex-col ">
        <h3 className='font-semibold'>{item.name}</h3>
        <p className='text-xs text-gray-500'>{item?.email}</p>
      </div>
      </td>
      <td className='hidden md:table-cell'>{item.teacherId}</td>
      <td className='hidden md:table-cell'>{item.subjects.join(',')}</td>
      <td className='hidden md:table-cell'>{item.classes.join(',')}</td>
      <td className='hidden md:table-cell'>{item.phone}</td>
      <td className='hidden md:table-cell'>{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-blueSky'>
            <Image src='/view.png' alt='' width={16} height={16} /> 
          </button>
          </Link>
          {role === "admin" && (
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-specialPurple'>
            <Image src='/delete.png' alt='' width={16} height={16} /> 
          </button>)}
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md flex-1  m-4 mt-0'>
      {/* TOP */}
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">

          <div className="flex items-center gap-4 self-end">
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow'>
              <Image src='/filter.png' width={14} height={14} alt='' />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow'>
              <Image src='/sort.png' width={14} height={14} alt='' />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow'>
              <Image src='/plus.png' width={14} height={14} alt='' />
            </button>
            <TableSearch />
          </div>
        </div>
        <h1 className='hidden  md:block text-lg font-semibold '> همه معلمان </h1>

      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      {/* PAGINATION */}
      <Pagination />


    </div>
  )
}

export default TeacherListPage
