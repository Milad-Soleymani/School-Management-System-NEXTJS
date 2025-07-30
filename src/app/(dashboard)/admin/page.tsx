import AttendanceChart from "@/components/AttendanceChart"
import CountChart from "@/components/CountChart"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/UserCard"

function AdminPage() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="دانش اموزان" />
          <UserCard type="معلم ها" />
          <UserCard type="والدین" />
          <UserCard type="پرسنل" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART  */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART  */}
          <div className="w-full lg:w-2/3 h-[450px] ">
            <AttendanceChart />
          </div>
        </div>

        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>


      {/* RIGHT */}
      <div className="w-full lg:w-1/3">r</div>

    </div>
  )
}

export default AdminPage