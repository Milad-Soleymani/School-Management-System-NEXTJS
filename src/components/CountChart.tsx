"use client"
import { count } from 'console';
import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'هفتم',
        count: 200,
        fill: '#C3EBFA',
    },
    {
        name: 'هشتم',
        count: 190,
        fill: '#FAE27C',
    },
    {
        name: 'نهم',
        count: 182,
        fill: '#CFCEFF',
    },
    {
        name: 'مجموع',
        count: 360,
        fill: 'white'
    }
];

function CountChart() {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4 '>
            {/* TITLE  */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>دانش اموزان</h1>
                <Image src='/moreDark.png' width={20} height={20} alt='' />
            </div>
            {/* CHART  */}
            <div className='relative w-[90%] h-[70%]'>
                <ResponsiveContainer >
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={92} data={data}>
                        <RadialBar
                            background
                            dataKey="count"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image src='/male.png' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ' alt='' width={20} height={20} />
            </div>
            {/* BOTTOM  */}
            <div className='flex justify-center gap-16 '>
                <div className="flex flex-col gap-1">
                    <div className=" w-5 h-5 bg-blueSky rounded-full" />
                    <h1 className='font-bold'>۱،۲۳۴</h1>
                    <h2 className='text-xs text-gray-300'>هفتم (۲۰٪)</h2>
                </div>

                <div className="flex flex-col gap-1">
                    <div className=" w-5 h-5 bg-specialYellow  rounded-full" />
                    <h1 className='font-bold'>۴،۹۳۶</h1>
                    <h2 className='text-xs text-gray-300'>هشتم (۳۰٪)</h2>
                </div>

                <div className="flex flex-col gap-1">
                    <div className=" w-5 h-5 bg-specialPurple rounded-full" />
                    <h1 className='font-bold'>۱،۲۳۴</h1>
                    <h2 className='text-xs text-gray-300'>نهم (۳۰٪)</h2>
                </div>
            </div>
        </div>
    )
}

export default CountChart
