"use client"
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [

    {
        name: 'چهارشنبه',
        present: 230,
        absent: 20,

    },
    {
        name: 'سه شنبه',
        present: 300,
        absent: 23,
    },
    {
        name: 'دوشنبه',
        present: 200,
        absent: 10,

    },
    {
        name: 'یکشنبه',
        present: 360,
        absent: 26,

    },
    {
        name: 'شنبه',
        present: 200,
        absent: 160,

    },

];

function AttendanceChart() {
    return (
        <div className='bg-white rounded-lg p-4 h-full'>
            <div className="flex justify-between items-center">
                <h1 className='text-lg font-semibold'>Attendance</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    barSize={20}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
                    <XAxis dataKey="name" axisLine={false} tick={{fill: '#d1d5db'}} tickLine={false} />
                    <YAxis axisLine={false}  tick={{fill: '#d1d5db'}} tickLine={false} />
                    <Tooltip contentStyle={{borderRadius: '10px', borderColor: 'lightgray'}} />
                    <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop: '20px', paddingBottom: '40px'}}/>
                    <Bar dataKey="present" fill="#FAE27C" legendType='circle' radius={[10,10,0,0]} />
                    <Bar dataKey="absent" fill="#C3EBFA"  legendType='circle' radius={[10,10,0,0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AttendanceChart
