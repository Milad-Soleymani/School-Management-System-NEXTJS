import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function notfound() {
        return(

          <div className="flex justify-center items-center min-h-screen text-center bg-[#EDF9FD]">
        <main className="p-8 bg-[#F1F0FF] rounded-2xl shadow-lg max-w-xl mx-4">
<div className='flex justify-center items-center'>

          {/* اینجا می‌توانید تصویر یا انیمیشن مورد نظر خود را قرار دهید */}
          <Image src={"/404.png"} width={200} height={200} alt="صفحه پیدا نشد" />

</div>
          <h1 className="text-4xl text-white font-bold mt-4 mb-2">صفحه مورد نظر یافت نشد</h1>
          <p className="text-xl text-[#C3EBFA] mb-8">سیستم مدیریت مدرسه</p>

          <Link href="/">
            <button className="py-3 px-6 text-base font-semibold text-white bg-[#FAE27C] rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#FEFCE8]">
              بازگشت به صفحه اصلی
            </button>
          </Link>
        </main>
      </div>
    
  )
  }



export default notfound
