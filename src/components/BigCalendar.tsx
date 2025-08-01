'use client'

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/fa'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import { calendarEvents } from '@/lib/data'

moment.locale('fa') // زبان فارسی فعال
const localizer = momentLocalizer(moment)

// تبدیل اعداد به فارسی
const toPersianNumber = (num: number | string) =>
  String(num).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d])

// فرمت برای نمایش ساعت در ستون کناری
const formats = {
  timeGutterFormat: (date: Date) => {
    const hour = date.getHours()
    const persianHour = toPersianNumber(hour)
    const suffix = hour < 12 ? 'قبل از ظهر' : 'بعد از ظهر'
    return `ساعت ${persianHour} ${suffix}`
  },
}

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK)

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView)
  }

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={['work_week', 'day']}
      view={view}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0)}
      max={new Date(2025, 1, 0, 14, 0)}
      formats={formats}
      style={{ height: '98%' }}
    />
  )
}

export default BigCalendar
