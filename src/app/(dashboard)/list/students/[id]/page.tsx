import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { getUserRole, toPersianDigits } from "@/lib/utils";
import { Class, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// داده‌های داینامیک کارت‌های کوچک / Small card dynamic data
const smallCardsData = [
  { icon: "/singleAttendance.png", title: "۹۰٪", subtitle: "حضور" },
  { icon: "/singleBranch.png", title: "ششم", subtitle: "پایه" },
  { icon: "/singleLesson.png", title: "۱۸", subtitle: "درس" },
  { icon: "/singleClass.png", title: `student.class.name`, subtitle: "کلاس" },
];

// داده‌های داینامیک لینک‌های میانبر / Shortcut links dynamic data
const shortcutLinks = [
  { href: `/list/lessons?classId=${2}`, label: "درس‌های دانش‌آموز", style: "bg-blueSkyLight" },
  { href: "/", label: "معلمان دانش‌آموز", style: "bg-specialPurpleLight" },
  { href: `/list/exams?classId=${2}`, label: "امتحانات دانش‌آموز", style: "bg-pink-50" },
  { href: `/list/assignments?classId=${2}`, label: "تکالیف دانش‌آموز", style: "bg-blueSkyLight" },
  { href: `/list/results?studentId=${"student2"}`, label: "نتایج دانش‌آموز", style: "bg-specialYellowLight" },
];

const SingleStudentPage =
  async ({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) => {

    const { id } = await params;

    const { role } = await getUserRole();

    const student: (Student & {class: (Class & {_count: {lessons:true}})}) | null = await prisma.student.findUnique({
      where: {
        id
      },
      include: {
        class: {
          include: {
            _count: {
              select: {
                lessons: true
              }
            }
          }
        }
      }
    });

    if (!student) {
      return notFound();
    }

    return (
      <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
        {/* بخش سمت چپ / Left section */}
        <div className="w-full xl:w-2/3 flex flex-col gap-4">
          {/* بخش بالایی / Top section */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* کارت اطلاعات دانش‌آموز / Student info card */}
            <div className="bg-blueSky py-6 px-4 rounded-md flex-1 flex gap-4">
              {/* تصویر پروفایل / Profile image */}
              <div className="w-1/3">
                <Image
                  src={student.img || "/noAvatar.png"}
                  alt="تصویر پروفایل / Profile image"
                  width={290}
                  height={290}
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
              {/* اطلاعات دانش‌آموز / Student info */}
              <div className="w-2/3 flex flex-col justify-between gap-4 text-right">
                <h1 className="text-xl font-semibold">{student.name + " " + student.surname}</h1>
                <p className="text-sm text-gray-500">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                </p>
                {/* جزئیات اضافی / Additional info */}
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/blood.png" alt="گروه خونی / Blood type" width={14} height={14} />
                    <span>{student.bloodType}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/date.png" alt="تاریخ تولد / Birth date" width={14} height={14} />
                    <span>{new Intl.DateTimeFormat("fa-IR").format(student.birthday)}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/mail.png" alt="ایمیل / Email" width={14} height={14} />
                    <span>{student.email || "-"}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/phone.png" alt="تلفن / Phone" width={14} height={14} />
                    <span>{student.phone || "-"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* کارت‌های کوچک داینامیک / Dynamic small cards */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* {smallCardsData.map((card, index) => (
                <div key={index} className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
                  <Image src={card.icon} alt={card.subtitle} width={24} height={24} className="w-6 h-6" />
                  <div>
                    <h1 className="text-xl font-semibold">{card.title}</h1>
                    <span className="text-sm text-gray-400">{card.subtitle}</span>
                  </div>
                </div>
              ))} */}
              {/* <div className="flex-1 flex gap-4 flex-wrap"> */}
              {/* CARD 1 */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] flex-row-reverse">
                <Image src="/singleAttendance.png" alt="حضور" width={24} height={24} className="w-6 h-6" />
                <div>
                  
                <Suspense fallback="در حال بارگزاری ...">
                  <StudentAttendanceCard id={student.id} />
                </Suspense>
                </div>
              </div>
              {/* CARD 2 */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] flex-row-reverse">
                <Image src="/singleBranch.png" alt="پایه" width={24} height={24} className="w-6 h-6" />
                <div>
                  <h1 className="text-xl font-semibold text-right">{student.class.name}</h1>
                  <span className="text-sm text-gray-400">کلاس</span>
                </div>
              </div>
              {/* CARD 3 */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] flex-row-reverse">
                <Image src="/singleLesson.png" alt="درس‌ها" width={24} height={24} className="w-6 h-6" />
                <div>
                  <h1 className="text-xl font-semibold text-right">{toPersianDigits(student.class._count.lessons)}</h1>
                  <span className="text-sm text-gray-400">درس</span>
                </div>
              </div>
              {/* CARD 4 */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] flex-row-reverse">
                <Image src="/singleClass.png" alt="کلاس" width={24} height={24} className="w-6 h-6" />
                <div>
                  <h1 className="text-xl font-semibold text-left">{"ام" + toPersianDigits(student.gradeId)}</h1>
                  <span className="text-sm text-gray-400">پایه</span>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>

          {/* بخش پایین / Bottom section */}
          <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
            <h1 className="mb-2">برنامه زمانی دانش‌آموز </h1>
            <BigCalendarContainer type="classId" id={student.class.id} />
          </div>
        </div>

        {/* بخش سمت راست / Right section */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          {/* لینک‌های میانبر / Shortcut Links */}
          <div className="bg-white p-4 rounded-md text-right">
            <h1 className="text-xl font-semibold">لینک‌های میانبر </h1>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500 text-right justify-end">
              {shortcutLinks.map((link, index) => (
                <Link key={index} className={`p-3 rounded-md ${link.style}`} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* نمودار عملکرد / Performance Chart */}
          <Performance />

          {/* اطلاعیه‌ها / Announcements */}
          <Announcements />
        </div>
      </div>
    );
  };

export default SingleStudentPage;
