import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { getUserRole } from "@/lib/utils";

const StudentPage = async () => {
  const { currentUserId } = await getUserRole();

  const classItem = await prisma.class.findMany({
    where: {
      students: {
        some: {
          id: currentUserId!
        }
      }
    }
  })
  console.log(classItem)
  return (
    <div className="p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="bg-white p-4 rounded-md h-full">
          <h1 className="text-xl font-semibold text-right mb-2">
            برنامه زمانی (نهم یک)
          </h1>
          <BigCalendarContainer type="classId" id={classItem[0].id}/>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}

export default StudentPage;
