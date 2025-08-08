import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import Performance from '@/components/Performance'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SingleTeacherPage() {
    return (
        <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
            {/* LEFT */}
            <div className="w-full lg:w-2/3">
                {/* TOP */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* USER INFO CARD */}
                    <div className="bg-blueSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="  flex justify-center items-center">
                            <Image 
                                src='/normalProfile.webp' 
                                width={144} 
                                height={144} 
                                alt='Teacher profile' 
                                className='w-36 h-36 rounded-full object-cover' 
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4 text-right">
                            <h1 className='text-xl font-semibold'>علی رضایی</h1>
                            <p className='text-xs text-gray-500'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                            <div className="items-center justify-between gap-2 flex-wrap flex text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full flex items-center gap-2">
                                    <Image src='/blood.png' width={14} height={14} alt='Blood type' />
                                    <span>A+</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full flex items-center gap-2">
                                    <Image src='/date.png' width={14} height={14} alt='Date' />
                                    <span>اردیبهشت ۸۹</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full flex items-center gap-2">
                                    <Image src='/mail.png' width={14} height={14} alt='Email' />
                                    <span>aliii&.reZaIiI@yahoo.com</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full flex items-center gap-2">
                                    <Image src='/phone.png' width={14} height={14} alt='Phone' />
                                    <span>۹۱۲ ۳۴۵ ۶۷۸۹</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SMALL CARD */}
                    <div className="flex-1 flex gap-4 justify-between flex-wrap">
                        {/* CARD */}
                        <div className="bg-white w-full rounded-md flex gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src='/singleAttendance.png' width={24} height={24} alt="Attendance" className='w-6 h-6' />
                            <div>
                                <h1 className='text-xl font-semibold'>۹۰ ٪</h1>
                                <span className='text-sm text-gray-400'>حضور</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className="bg-white w-full rounded-md flex gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src='/singleClass.png' width={24} height={24} alt="Classes" className='w-6 h-6' />
                            <div>
                                <h1 className='text-xl font-semibold'>۶</h1>
                                <span className='text-sm text-gray-400'>کلاس</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className="bg-white w-full rounded-md flex gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src='/singleLesson.png' width={24} height={24} alt="Lessons" className='w-6 h-6' />
                            <div>
                                <h1 className='text-xl font-semibold'>۶</h1>
                                <span className='text-sm text-gray-400'>درس</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className="bg-white w-full rounded-md flex gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src='/singleBranch.png' width={24} height={24} alt="Branches" className='w-6 h-6' />
                            <div>
                                <h1 className='text-xl font-semibold'>۱</h1>
                                <span className='text-sm text-gray-400'>رشته</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* BOTTOM */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>برنامه زمانی معلم</h1>
                    <BigCalendar />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-md text-right ">
                <h1 className='text-xl font-semibold '>لینک‌های میانبر</h1>
                <div className="mt-4 flex gap-4 flex-wrap text-sm text-gray-500 justify-end">
                    <Link className='p-3 rounded-md bg-blueSkyLight' href='/'>کلاس های معلم</Link>
                    <Link className='p-3 rounded-md bg-specialPurpleLight' href='/'>دانش اموزان معلم</Link>
                    <Link className='p-3 rounded-md bg-specialYellowLight' href='/'>دروس معلم</Link>
                    <Link className='p-3 rounded-md bg-pink-50' href='/'>امتحانات معلم</Link>
                    <Link className='p-3 rounded-md bg-blueSkyLight' href='/'>تکالیف معلم</Link>
                </div>
            </div>
            <Performance />
            <Announcements />
            </div>
        </div>
    )
}

export default SingleTeacherPage