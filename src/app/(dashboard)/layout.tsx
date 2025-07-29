import Menu from "@/components/Menu";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[86%]  md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] ">
        <NavBar />
        {children}
      </div>
      {/* RIGHT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link href='/' className="flex items-center justify-center lg:justify-end gap-2">
        <span className="hidden lg:block">سامانه مدیریت مدارس</span>
        <Image src="/logo.png" width={52} height={52} alt="" />
        </Link>
        <Menu />
      </div>
    </div>
  );
}
