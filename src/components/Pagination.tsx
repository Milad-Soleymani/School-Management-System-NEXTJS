import React from 'react'

function Pagination() {
    return (
        <div className='p-4 flex items-center justify-between text-gray-500'>
            <button  className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">قبلی</button>
            <div className="flex items-center gap-2 text-sm">
                <button className='px-2 rounded-sm bg-blueSky'>۱</button>
                <button className='px-2 rounded-sm '>۲</button>
                <button className='px-2 rounded-sm '>۳</button>
                ...
                <button className='px-2 rounded-sm '>۱۰</button>
            </div>
            <button  className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">بعدی</button>
        </div>
    )
}

export default Pagination
