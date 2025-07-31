"use client"
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [

    {
        name: 'چهارشنبه',
        حاضر: 230,
        غایب: 20,

    },
    {
        name: 'سه شنبه',
        حاضر: 300,
        غایب: 23,
    },
    {
        name: 'دوشنبه',
        حاضر: 200,
        غایب: 10,

    },
    {
        name: 'یکشنبه',
        حاضر: 360,
        غایب: 26,

    },
    {
        name: 'شنبه',
        حاضر: 200,
        غایب: 160,

    },

];

function AttendanceChart() {
    return (
        <div className='bg-white rounded-lg p-4 h-full'>
            <div className="flex justify-between items-center">
                <h1 className='text-lg font-semibold'>حضور و غایب</h1>
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
                    <Bar dataKey="حاضر" fill="#FAE27C" legendType='circle' radius={[10,10,0,0]} />
                    <Bar dataKey="غایب" fill="#C3EBFA"  legendType='circle' radius={[10,10,0,0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AttendanceChart
