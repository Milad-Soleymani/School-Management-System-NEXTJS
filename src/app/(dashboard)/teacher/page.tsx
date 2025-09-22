import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { getUserRole } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

/**
 * TeacherPage Component
 * صفحه برنامه زمانی معلم
 */
const TeacherPage = async() => {

  const {currentUserId} = await getUserRole()
  

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT SIDE - Calendar */}
      {/* سمت چپ - تقویم */}
      <div className="w-full xl:w-2/3">
        <div className="bg-white p-4 rounded-md h-full">
          <h1 className="text-xl font-semibold text-right mb-2">
            برنامه زمانی
          </h1>
          <BigCalendarContainer type="teacherId" id={currentUserId!} />
        </div>
      </div>

      {/* RIGHT SIDE - Announcements */}
      {/* سمت راست - اطلاعیه‌ها */}
      <div className="w-full xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
}

export default TeacherPage;
