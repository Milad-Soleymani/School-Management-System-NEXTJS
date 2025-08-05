"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import Calendar from 'react-modern-calendar-datepicker';

// TEMPORARY DATA
const events = [
  {
    id: 1,
    title: "لورم ایپسوم",
    time: "۱۲:۰۰ PM - ۲:۰۰ PM",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  }, {
    id: 2,
    title: "لورم ایپسوم",
    time: "۱۲:۰۰ PM - ۲:۰۰ PM",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  }, {
    id: 3,
    title: "لورم ایپسوم",
    time: "۱۲:۰۰ PM - ۲:۰۰ PM",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  }
]
function EventCalendar() {
  const [date, setDate] = useState();
  return (
    <div className='bg-white p-4 rounded-md'>
      <div className="flex justify-center">
      <Calendar 
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
              <span className='text-gray-300 text-sm'>{event.time}</span>
              <h1 className='font-semibold text-gray-600'>{event.title}</h1>
            </div>
            <p className='mt-2 text-gray-400 text-sm text-right'>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default EventCalendar
