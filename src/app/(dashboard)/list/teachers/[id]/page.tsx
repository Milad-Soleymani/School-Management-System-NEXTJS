import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import FormContainer from "@/components/forms/FormContainer";
import Performance from "@/components/Performance";
import prisma from "@/lib/prisma";
import { getUserRole, toPersianDigits } from "@/lib/utils";
import { Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const { id } = await params;

  const { role } = await getUserRole();

  const teacher: (Teacher & {_count:{subjects:number; lessons:number; classes:number}}) | null = await prisma.teacher.findUnique({
    where: {
      id
    },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true
        }
      }
    }
  });

  if (!teacher) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-blueSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={teacher.img || "/noAvatar.png"}
                alt="تصویر پروفایل"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4 text-right">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">{teacher.name + " " + teacher.surname}</h1>
                {role == "admin" && (
                  <FormContainer
                    table="teacher"
                    type="update"
                    data={teacher}
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="گروه خونی" width={14} height={14} />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="تاریخ تولد" width={14} height={14} />
                  <span>{new Intl.DateTimeFormat("fa-IR").format(teacher.birthday)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="ایمیل" width={14} height={14} />
                  <span>{teacher.email || "-"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="تلفن" width={14} height={14} />
                  <span>{teacher.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* INFO CARDS */}
          <div className="flex-1 flex gap-4 flex-wrap">
            {/* CARD 1 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] flex-row-reverse">
              <Image src="/singleAttendance.png" alt="حضور" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold text-right">۹۰٪</h1>
                <span className="text-sm text-gray-400">حضور</span>
              </div>
            </div>
            {/* CARD 2 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] flex-row-reverse">
              <Image src="/singleBranch.png" alt="پایه" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold text-right">{toPersianDigits(teacher._count.subjects)}</h1>
                <span className="text-sm text-gray-400">ماده درسی</span>
              </div>
            </div>
            {/* CARD 3 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] flex-row-reverse">
              <Image src="/singleLesson.png" alt="درس‌ها" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold text-right">{toPersianDigits(teacher._count.lessons)}</h1>
                <span className="text-sm text-gray-400">درس</span>
              </div>
            </div>
            {/* CARD 4 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] flex-row-reverse">
              <Image src="/singleClass.png" alt="کلاس" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold text-right">{toPersianDigits(teacher._count.classes)}</h1>
                <span className="text-sm text-gray-400">کلاس</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>برنامه زمانی معلم</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md text-right">
          <h1 className="text-xl font-semibold">لینک‌های میانبر</h1>
          <div className="mt-4 flex gap-4 flex-wrap justify-end text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-blueSkyLight" href={`/list/lessons?teacherId=${"teacher2"}`}>
              دروس معلم
            </Link>
            <Link className="p-3 rounded-md bg-specialPurpleLight" href={`/list/students?teacherId=${"teacher2"}`}>
              دانش‌آموزان معلم
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href={`/list/exams?teacherId=${"teacher12"}`}>
              امتحانات معلم
            </Link>
            <Link className="p-3 rounded-md bg-blueSkyLight" href={`/list/assignments?teacherId=${"teacher12"}`}>
              تکالیف معلم
            </Link>
            <Link className="p-3 rounded-md bg-specialYellowLight" href={`/list/classes?supervisorId=${"teacher12"}`}>
              کلاس های معلم
            </Link>
          </div>
        </div>

        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
