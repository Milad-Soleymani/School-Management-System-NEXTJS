"use client"

import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'مهر',
        درامد: 400,
        هزینه: 240,

    },
    {
        name: 'ابان',
        درامد: 3000,
        هزینه: 98,

    },
    {
        name: 'اذر',
        درامد: 200,
        هزینه: 199,

    },
    {
        name: 'دی',
        درامد: 2700,
        هزینه: 3900,

    },
    {
        name: 'بهمن',
        درامد: 1800,
        هزینه: 48,

    },
    {
        name: 'اسفند',
        درامد: 20,
        هزینه:90,

    },
    {
        name: 'فروردین',
        درامد: 390,
        هزینه: 50,

    },

    {
        name: 'اردیبهشت',
        درامد: 90,
        هزینه: 4,

    },
    {
        name: 'خرداد',
        درامد: 30,
        هزینه: 40,

    },
];

function FinanceChart() {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>مالی ( میلیون تومان  )</h1>
                <Image src='/moreDark.png' width={20} height={20} alt='' />
            </div>
            <ResponsiveContainer width="103%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="name" axisLine={false} tick={{ fill: '#d1d5db' }} tickLine={false} tickMargin={10} />
                    <YAxis axisLine={false} tick={{ fill: '#d1d5db' }} tickLine={false} tickMargin={10} />
                    <Tooltip />
                    <Legend align='center' verticalAlign='top' wrapperStyle={{paddingTop: '10px', paddingBottom: '30px'}}/>
                    <Line type="monotone" dataKey="درامد" stroke="#C3EBFA" strokeWidth={5} />
                    <Line type="monotone" dataKey="هزینه" stroke="#CFCEFF" strokeWidth={5} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default FinanceChart
