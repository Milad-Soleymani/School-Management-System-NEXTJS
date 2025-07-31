"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { Calendar } from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";

// TEMPORARY DATA
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }, {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }, {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }
]
function EventCalendar() {
  const [date, setDate] = useState();
  console.log(date)
  return (
    <div className='bg-white p-4 rounded-md'>
      <div className="flex justify-center">
      <Calendar calendarClassName=''
        value={date}
        shouldHighlightWeekends
        locale="fa"
      />
      </div>
      <div className="flex items-center justify-between">
        <h1 className='text-xl font-semibold my-4'> رویداد ها </h1>
        <Image src='/moreDark.png' alt='' width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map(event => (
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-blueSky even:border-t-specialPurple" key={event.id}>
            <div className="flex items-center justify-between">
              <h1 className='font-semibold text-gray-600'>{event.title}</h1>
              <span className='text-gray-300 text-sm'>{event.time}</span>
            </div>
            <p className='mt-2 text-gray-400 text-sm'>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default EventCalendar
