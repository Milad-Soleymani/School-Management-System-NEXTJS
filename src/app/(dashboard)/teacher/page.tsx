import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";

/**
 * TeacherPage Component
 * صفحه برنامه زمانی معلم
 */
function TeacherPage() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT SIDE - Calendar */}
      {/* سمت چپ - تقویم */}
      <div className="w-full xl:w-2/3">
        <div className="bg-white p-4 rounded-md h-full">
          <h1 className="text-xl font-semibold text-right mb-2">
            برنامه زمانی
          </h1>
          <BigCalendar />
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
