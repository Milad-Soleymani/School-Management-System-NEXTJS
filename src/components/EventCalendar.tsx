'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// داده‌های موقت رویدادها
const events = [
  {
    id: 1,
    title: "لورم ایپسوم",
    time: "۱۲:۰۰ PM - ۲:۰۰ PM",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  },
  {
    id: 2,
    title: "لورم ایپسوم",
    time: "۱۲:۰۰ PM - ۲:۰۰ PM",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  },
  {
    id: 3,
    title: "لورم ایپسوم",
    time: "۱۲:۰۰ PM - ۲:۰۰ PM",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  },
]

function EventCalendar() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      {/* بخش تقویم */}
      <div className="flex justify-center mb-4">
        <Calendar
          value={date}
          locale="fa"
        />
      </div>

      {/* بخش عنوان و گزینه‌ها */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">رویدادها</h1>
        <Image src="/moreDark.png" alt="گزینه‌ها" width={20} height={20} />
      </div>

      {/* لیست رویدادها */}
      <div className="flex flex-col gap-4">
        {events.map(event => (
          <div
            key={event.id}
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-blueSky even:border-t-specialPurple shadow-sm"
          >
            {/* زمان و عنوان رویداد */}
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">{event.time}</span>
              <h2 className="font-semibold text-gray-600">{event.title}</h2>
            </div>
            {/* توضیحات رویداد */}
            <p className="mt-2 text-gray-500 text-sm text-right">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventCalendar
