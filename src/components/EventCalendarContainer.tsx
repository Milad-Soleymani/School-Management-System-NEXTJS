import Image from 'next/image'
import React from 'react'
import EventList from './EventList'
import EventCalendar from './EventCalendar'
import Link from 'next/link'

const EventCalendarContainer = async ({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) => {
  const params = await searchParams
  const dateParam = params?.date

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-center mb-4">
        <EventCalendar />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">رویدادها</h1>
        <Link href={'/list/events'}>
          <Image src="/moreDark.png" alt="گزینه‌ها" width={20} height={20} />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <EventList dateParam={dateParam} />
      </div>
    </div>
  )
}

export default EventCalendarContainer