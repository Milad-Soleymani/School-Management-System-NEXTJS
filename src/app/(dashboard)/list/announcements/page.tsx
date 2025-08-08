import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { announcementsData, role } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Announcement = {
    id: number;
    title: string;
    class: string;
    date: string;
}

const columns = [
    {
        header: "موضوع",
        accessor: "title"
    }, {
        header: "کلاس",
        accessor: "class",
        className: "hidden md:table-cell"

    }, {
        header: "تاریخ",
        accessor: "date",
        className: "hidden md:table-cell"
    }, {
        header: "اعمال",
        accessor: "actions",
    }

]

const AnnouncementListPage = () => {

    const renderRow = (item: Announcement) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight'>
            <td className='flex items-center gap-4 p-4'>
                {item.title}
            </td>
            <td >{item.class}</td>
            <td className='hidden md:table-cell'>{item.date}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormModal table='subject' type='update' data={item} />
                            <FormModal table='subject' type='delete' id={item.id} />

                        </>
                    )}
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
                        {role === 'admin' &&
                            <FormModal table='subject' type='create' />
                        }
                        <TableSearch />
                    </div>
                </div>
                <h1 className='hidden  md:block text-lg font-semibold '> همه اطلاعیه ها </h1>

            </div>

            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={announcementsData} />
            {/* PAGINATION */}
            <Pagination />


        </div>
    )
}

export default AnnouncementListPage
