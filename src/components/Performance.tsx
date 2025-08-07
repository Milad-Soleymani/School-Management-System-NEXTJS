"use client"
import Image from 'next/image';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 92, fill: '#C3EBFA' },
    { name: 'Group B', value: 8, fill: '#FAE27C' },
];

export default function Performance() {
    return (
        <div className='bg-white p-4 rounded-md h-80 relative'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-semibold'>عملکرد</h1>
                <Image src='/moreDark.png' width={16} height={16} alt='' />
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        fill="#8884d8"
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h1 className='text-3xl font-bold'>۹.۲</h1>
                <p className='text-gray-400 text-xs'>از ۱۰ امتیاز</p>
            </div>
            <div className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">ترم اول - ترم دوم</div>
        </div>
    )
}
