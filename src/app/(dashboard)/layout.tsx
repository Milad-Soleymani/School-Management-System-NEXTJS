import Menu from "@/components/Menu";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[86%]  md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA]  overflow-scroll flex flex-col">
        <NavBar />
        {children}
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
      {/* RIGHT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 pt-0 flex flex-col ">
        <div className="flex items-center justify-center">
        <Link href='/' className="flex items-center justify-center lg:justify-end gap-2 text-right">

        <Image src="/logo.png" width={72} height={72} alt=""/>
        </Link>
        </div>
        <Menu />
      </div>
    </div>
  );
}
