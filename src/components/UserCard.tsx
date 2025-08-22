import Image from "next/image";
import React from "react";

interface UserCardProps {
  type: string; // نوع کاربر یا داده‌ای که باید نمایش داده شود
}

const UserCard: React.FC<UserCardProps> = ({ type }) => {
  return (
    // کارت اصلی با رنگ متناوب برای هر کارت
    <div className="rounded-2xl odd:bg-specialPurple even:bg-specialYellow p-4 flex-1 min-w-[130px]">
      
      {/* هدر کارت شامل تاریخ و آیکون گزینه‌ها */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          ۱۴۰۴/۵
        </span>
        <Image src="/more.png" alt="Options" width={20} height={20} />
      </div>

      {/* مقدار اصلی */}
      <h1 className="text-2xl font-semibold my-3">۱،۲۳۴</h1>

      {/* نوع کارت */}
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default UserCard;
