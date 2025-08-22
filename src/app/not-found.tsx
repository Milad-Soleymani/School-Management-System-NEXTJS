import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * NotFound Component
 * صفحه 404 - صفحه مورد نظر یافت نشد
 */
function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen text-center bg-[#EDF9FD]">
      <main className="p-8 bg-[#F1F0FF] rounded-2xl shadow-lg max-w-xl mx-4">
        {/* تصویر یا انیمیشن */}
        <div className="flex justify-center items-center">
          <Image
            src="/404.png"
            width={200}
            height={200}
            alt="صفحه پیدا نشد"
          />
        </div>

        <h1 className="text-4xl font-bold mt-4 mb-2 text-gray-500">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-xl text-[#C3EBFA] mb-8">سیستم مدیریت مدرسه</p>

        <Link href="/">
          <button className="py-3 px-6 text-base font-semibold text-white bg-[#FAE27C] rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#E6C24A]">
            بازگشت به صفحه اصلی
          </button>
        </Link>
      </main>
    </div>
  );
}

export default NotFound;
