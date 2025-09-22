'use client'

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/fa'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'

// تنظیم زبان فارسی برای تقویم
moment.locale('fa')
const localizer = momentLocalizer(moment)

// تابع تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (num: number | string) =>
  String(num).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d])

// فرمت نمایش زمان در ستون کناری
const formats = {
  timeGutterFormat: (date: Date) => {
    const hour = date.getHours()
    const persianHour = toPersianNumber(hour)
    const suffix = hour < 12 ? 'قبل از ظهر' : 'بعد از ظهر'
    return `ساعت ${persianHour} ${suffix}`
  },
}

const BigCalendar = ({data} : {data:{title: string, start: Date, end: Date}[]}) => {
  // وضعیت نمایش فعلی تقویم (کار هفته یا روز)
  const [view, setView] = useState<View>(Views.WORK_WEEK)

  // تغییر نمایش تقویم
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView)
  }

  return (
    <div className="bg-white p-4 rounded-md h-full">
      {/* تقویم */}
      <Calendar
        localizer={localizer}
        events={data} // داده‌های رویدادها
        startAccessor="start" // شروع رویداد
        endAccessor="end" // پایان رویداد
        views={['work_week', 'day']} // نوع نمایش‌ها
        view={view} // نمایش فعلی
        onView={handleOnChangeView} // تغییر نمایش
        min={new Date(2025, 1, 0, 8, 0)} // ساعت شروع روز
        max={new Date(2025, 1, 0, 14, 0)} // ساعت پایان روز
        formats={formats} // فرمت زمان
        style={{ height: '98%' }}
      />
    </div>
  )
}

export default BigCalendar
