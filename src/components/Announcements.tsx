
function Announcements() {
  return (
    <div className='bg-white p-4 rounded-md mt-5'>
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-semibold">اطلاعیه ها</h1>
        <span className='text-xs text-gray-600'>دیدن همه</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
      <div className="bg-blueSkyLight rounded-md p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">۱۴۰۴/۵/۶</span>
          <h2 className="font-medium">لورم ایپسوم</h2>
        </div>
        <p className="text-sm text-gray-400 mt-1 text-right"> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
      </div>
      <div className="bg-specialPurpleLight rounded-md p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">۱۴۰۴/۵/۶</span>
          <h2 className="font-medium">لورم ایپسوم</h2>
        </div>
        <p className="text-sm text-gray-400 mt-1 text-right"> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
      </div>
      <div className="bg-specialYellowLight rounded-md p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">۱۴۰۴/۵/۶</span>
          <h2 className="font-medium">لورم ایپسوم</h2>
        </div>
        <p className="text-sm text-gray-400 mt-1 text-right"> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
      </div>
      </div>
    </div>
  )
}

export default Announcements
