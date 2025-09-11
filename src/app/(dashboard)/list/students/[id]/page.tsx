import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

// داده‌های داینامیک کارت‌های کوچک / Small card dynamic data
const smallCardsData = [
  { icon: "/singleAttendance.png", title: "۹۰٪", subtitle: "حضور" },
  { icon: "/singleBranch.png", title: "ششم", subtitle: "پایه" },
  { icon: "/singleLesson.png", title: "۱۸", subtitle: "درس" },
  { icon: "/singleClass.png", title: "هفتم ۱", subtitle: "کلاس" },
];

// داده‌های داینامیک لینک‌های میانبر / Shortcut links dynamic data
const shortcutLinks = [
  { href: `/list/lessons?classId=${2}`, label: "درس‌های دانش‌آموز", style: "bg-blueSkyLight" },
  { href: "/", label: "معلمان دانش‌آموز", style: "bg-specialPurpleLight" },
  { href: "/", label: "امتحانات دانش‌آموز", style: "bg-pink-50" },
  { href: "/", label: "تکالیف دانش‌آموز", style: "bg-blueSkyLight" },
  { href: "/", label: "نتایج دانش‌آموز", style: "bg-specialYellowLight" },
];

const SingleStudentPage = () => {
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
                src="/noAvatar.png"
                alt="تصویر پروفایل / Profile image"
                width={290}
                height={290}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            {/* اطلاعات دانش‌آموز / Student info */}
            <div className="w-2/3 flex flex-col justify-between gap-4 text-right">
              <h1 className="text-xl font-semibold">علی رضایی</h1>
              <p className="text-sm text-gray-500">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
              </p>
              {/* جزئیات اضافی / Additional info */}
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="گروه خونی / Blood type" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="تاریخ تولد / Birth date" width={14} height={14} />
                  <span>ژانویه ۲۰۲۵</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="ایمیل / Email" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="تلفن / Phone" width={14} height={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>

          {/* کارت‌های کوچک داینامیک / Dynamic small cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {smallCardsData.map((card, index) => (
              <div key={index} className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
                <Image src={card.icon} alt={card.subtitle} width={24} height={24} className="w-6 h-6" />
                <div>
                  <h1 className="text-xl font-semibold">{card.title}</h1>
                  <span className="text-sm text-gray-400">{card.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* بخش پایین / Bottom section */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="mb-2">برنامه زمانی دانش‌آموز / Student Schedule</h1>
          <BigCalendar />
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
