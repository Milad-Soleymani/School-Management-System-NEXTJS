
import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";
type UserType = "admin" | "teacher" | "student" | "parent";
interface UserCardProps {
  type: UserType; // نوع کاربر یا داده‌ای که باید نمایش داده شود
}

const UserCard = async ({ type }: UserCardProps) => {

  const modelMap: Record<UserType, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent
  }

  const typeMap: Record<UserType, string> = {
  admin: "پرسنل",
  teacher: "معلم",
  student: "دانش‌آموز",
  parent: "اولیا",
};


  const data = await modelMap[type].count();
  const persianNumber = data.toLocaleString("fa-IR")
  // console.log(data)
  return (
    // کارت اصلی با رنگ متناوب برای هر کارت
    <div className="rounded-2xl odd:bg-specialPurple even:bg-specialYellow p-4 flex-1 min-w-[130px]">

      {/* هدر کارت شامل تاریخ و آیکون گزینه‌ها */}
      <div className="flex justify-between items-center">
        <Image src="/more.png" alt="Options" width={20} height={20} />
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          ۱۴۰۴/۵
        </span>
      </div>

      {/* مقدار اصلی */}
      <h1 className="text-2xl font-semibold my-3 text-right">{persianNumber}</h1>

      {/* نوع کارت */}
      <h2 className="capitalize text-sm font-medium text-gray-500 text-right">{typeMap[type]}</h2>
    </div>
  );
};

export default UserCard;
