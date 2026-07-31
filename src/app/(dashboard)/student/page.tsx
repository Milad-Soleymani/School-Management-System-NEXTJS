import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { getUserRole } from "@/lib/utils";

const StudentPage = async () => {
const { currentUserId } = await getUserRole();

  const classItem = await prisma.class.findFirst({
    where: {
      students: {
        some: {
          id: currentUserId!,
        },
      },
    },
  });

  console.log("CLASS:", classItem);

  return (
    <div className="p-4 flex flex-col gap-4 xl:flex-row">

      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="bg-white p-4 rounded-md h-full">
          <h1 className="text-xl font-semibold text-right mb-2">
            برنامه زمانی
          </h1>

          {classItem ? (
            <BigCalendarContainer
              type="classId"
              id={classItem.id}
            />
          ) : (
            <p className="text-center">
              هنوز کلاسی برای این دانش‌آموز ثبت نشده است
            </p>
          )}

        </div>
      </div>


      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>

    </div>
  );
};

export default StudentPage;