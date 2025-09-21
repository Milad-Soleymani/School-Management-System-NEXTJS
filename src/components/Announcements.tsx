import prisma from "@/lib/prisma";
import { ANNOUNCEMENT_PER_ITEM } from "@/lib/setting";
import { getUserRole } from "@/lib/utils";
import Link from "next/link";

// کامپوننت اطلاعیه‌ها
const Announcements = async () => {

  const { role, currentUserId } = await getUserRole();

  const roleConditions = {
    admin: {},
    teacher: {
      lessons: {
        some: {
          teacherId:
            currentUserId!

        }
      }
    },
    parent: {
      students: {
        some: {
          parenId:
            currentUserId!

        }
      }
    }, student: {
      students: {
        some: {
          id:
            currentUserId!

        }
      }
    }
  }
  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });
  const colors = ["bg-blueSkyLight", "bg-specialPurpleLight", "bg-specialYellowLight"];
  return (
 <div className="bg-white p-6 rounded-xl shadow-md w-full">
      {/* هدر */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold ">اطلاعیه‌ها</h1>
       <Link href={"/list/announcements"}>
        <span  className="text-xs md:text-sm text-blue-600 cursor-pointer hover:text-blue-800">
          دیدن همه
        </span>
       </Link> 
      </div>

      {/* لیست اطلاعیه‌ها */}
      <div className="mt-4 flex flex-col gap-4">
        {data.map((item, index) => {
          const bgColor = colors[index % colors.length]; // هر آیتم یه رنگ متفاوت
          return (
            <div
              key={item.id}
              className={`${bgColor} p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md">
                  {item.date instanceof Date
                    ? item.date.toLocaleDateString("fa-IR")
                    : item.date}
                </span>
                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                  {item.title}
                </h2>
              </div>
              <p className="text-gray-500 text-sm md:text-base text-right leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Announcements;
