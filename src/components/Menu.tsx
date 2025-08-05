import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "منو",
    items: [
      {
        icon: "/home.png",
        label: "خانه",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "معلّم ها",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "دانش اموزان",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "والدین",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "مواد درسی",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "کلاس ها",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "دروس",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "امتحانات",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "تکالیف",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "نتایج",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "حضور و غیاب",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "رویداد ها",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "پیام ها",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "اطلاعیه ها",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "دیگر",
    items: [
      {
        icon: "/profile.png",
        label: "پروفایل",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "تنظیمات",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "خروج از حساب",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];
const Menu = () => {
  return (
    <div className="flex flex-col items-end font-thin w-full text-[13px]">
      {menuItems.map(i => (
        <div key={i.title} className="flex flex-col p-0 w-full items-center">
          <span className="hidden lg:block text-gray-400 font-semibold my-4">{i.title}</span>
          {i.items.map(item => {
            if (item.visible.includes(role)) {
              return (
                <Link href={item.href} key={item.href} className="flex items-center justify-center w-[100%]  lg:justify-end gap-4 text-gray-500 py-1.5 rounded-md  hover:bg-blueSkyLight" >
                  <span className="hidden lg:block font-medium">{item.label}</span>
                  <Image src={item.icon} width={18} height={18} alt={item.label} />
                </Link>
              )
            }
          })}
        </div>
      ))}
    </div>
  )
}

export default Menu;