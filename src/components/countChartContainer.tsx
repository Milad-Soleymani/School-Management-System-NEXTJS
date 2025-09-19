'use client'

import React, { useEffect, useState } from 'react'
import CountChart from './CountChart'

type ApiRes = {
  firstGrade?: number
  secondGrade?: number
  error?: string
}

const CountChartContainer: React.FC = () => {
  const [firstGrade, setFirstGrade] = useState<number>(0)
  const [secondGrade, setSecondGrade] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchCounts() {
      try {
        const res = await fetch('/api/student-count')
        const json: ApiRes = await res.json()

        if (!mounted) return

        if (res.ok && typeof json.firstGrade === 'number' && typeof json.secondGrade === 'number') {
          setFirstGrade(json.firstGrade)
          setSecondGrade(json.secondGrade)
        } else {
          setError(json.error || 'خطا در دریافت داده‌ها')
        }
      } catch (e) {
        console.error(e)
        if (mounted) setError('خطا در اتصال به سرور')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCounts()
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="p-4">در حال بارگذاری...</div>
  if (error) return <div className="p-4 text-red-500">خطا: {error}</div>

  // مهم: والدِ این کانتینر (جایی که در صفحه قرار می‌دهی) باید ارتفاع مناسب داشته باشد،
  // مثال: <div className="w-full h-[380px]"><CountChartContainer /></div>
  return (
    <div className="w-full h-full">
      <CountChart firstGrade={firstGrade} secondGrade={secondGrade} />
    </div>
  )
}

export default CountChartContainer
