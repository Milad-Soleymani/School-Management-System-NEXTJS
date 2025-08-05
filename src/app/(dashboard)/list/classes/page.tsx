import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { classesData, role } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Class = {
    id: number;
    name: string;
    capacity: number;
    grade: number;
    supervisor: string[];
}

const columns = [
    {
        header: "نام کلاس",
        accessor: "name"
    }, {
        header: "ظرفیت",
        accessor: "capacity",
        className: "hidden md:table-cell"

    }, {
        header: "پایه",
        accessor: "grade",
        className: "hidden md:table-cell"
    }, {
        header: "ناظر",
        accessor: "supervisor",
        className: "hidden md:table-cell"
    },
    {
        header: "اعمال",
        accessor: "actions",
    }

]

const ClassListPage = () => {

    const renderRow = (item: Class) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight'>
            <td className='flex items-center gap-4 p-4'>
                {item.name}

            </td>
            <td className='hidden md:table-cell'>{item.capacity}</td>
            <td className='hidden md:table-cell'>{item.grade}</td>
            <td className='hidden md:table-cell'>{item.supervisor}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className='w-7 h-7 flex items-center justify-center rounded-full bg-blueSky'>
                            <Image src='/edit.png' alt='' width={16} height={16} />
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
                        {role === 'admin' && <button className='w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow'>
                            <Image src='/plus.png' width={14} height={14} alt='' />
                        </button>}
                        <TableSearch />
                    </div>
                </div>
                <h1 className='hidden  md:block text-lg font-semibold '> همه کلاس ها </h1>

            </div>

            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={classesData} />
            {/* PAGINATION */}
            <Pagination />


        </div>
    )
}

export default ClassListPage
