import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * NotFound Component
 * صفحه 404 - صفحه مورد نظر یافت نشد
 */
function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen text-center bg-gradient-to-br from-yellow-400 to-sky-400 text-[#333333]">
      <main className="p-8 max-w-xl rounded-lg shadow-xl mx-4 bg-white">
        {/* تصویر یا انیمیشن */}
        <div className="flex justify-center items-center">
          <Image
            src="/404.png"
            width={200}
            height={200}
            alt="صفحه پیدا نشد"
          />
        </div>

        <h1 className="text-4xl font-bold mt-4 mb-2 text-[#4e4e4e]">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-xl text-[#525151] mb-8">سیستم مدیریت مدرسه</p>

        <Link href="/">
          <button className="py-3 px-6 text-base font-semibold text-white bg-[#7cb7ff] rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#338fff]">
            بازگشت به صفحه اصلی
          </button>
        </Link>
      </main>
    </div>
  );
}

export default NotFound;
