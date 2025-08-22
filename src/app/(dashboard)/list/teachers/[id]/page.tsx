import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
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
                src="/normalProfile.webp"
                alt="تصویر پروفایل"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4 text-right">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">علی رضایی</h1>
                <FormModal
                  table="teacher"
                  type="update"
                  data={{
                    id: 1,
                    username: "deanguerrero",
                    email: "deanguerrero@gmail.com",
                    password: "password",
                    firstname: "علی",
                    lastname: "رضایی",
                    phone: "+1 234 567 89",
                    address: "1234 Main St, Anytown, USA",
                    bloodType: "A+",
                    date0fBirth: "2000-01-01",
                    sex: "male",
                    img: "/normalProfile.webp",
                  }}
                />
              </div>
              <p className="text-sm text-gray-500">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="گروه خونی" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="تاریخ تولد" width={14} height={14} />
                  <span>ژانویه ۲۰۲۵</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="ایمیل" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="تلفن" width={14} height={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>

          {/* INFO CARDS */}
          <div className="flex-1 flex gap-4 flex-wrap">
            {/* CARD 1 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
              <Image src="/singleAttendance.png" alt="حضور" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">۹۰٪</h1>
                <span className="text-sm text-gray-400">حضور</span>
              </div>
            </div>
            {/* CARD 2 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
              <Image src="/singleBranch.png" alt="پایه" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">ششم</h1>
                <span className="text-sm text-gray-400">پایه</span>
              </div>
            </div>
            {/* CARD 3 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
              <Image src="/singleLesson.png" alt="درس‌ها" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">۱۸</h1>
                <span className="text-sm text-gray-400">درس</span>
              </div>
            </div>
            {/* CARD 4 */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
              <Image src="/singleClass.png" alt="کلاس" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">هفتم ۱</h1>
                <span className="text-sm text-gray-400">کلاس</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>برنامه زمانی دانش‌آموز</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md text-right">
          <h1 className="text-xl font-semibold">لینک‌های میانبر</h1>
          <div className="mt-4 flex gap-4 flex-wrap justify-end text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-blueSkyLight" href="/">
              دروس معلم
            </Link>
            <Link className="p-3 rounded-md bg-specialPurpleLight" href="/">
              دانش‌آموزان معلم
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              امتحانات معلم
            </Link>
            <Link className="p-3 rounded-md bg-blueSkyLight" href="/">
              تکالیف معلم
            </Link>
            <Link className="p-3 rounded-md bg-specialYellowLight" href="/">
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

export default SingleStudentPage;
