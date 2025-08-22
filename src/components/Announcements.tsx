// کامپوننت اطلاعیه‌ها
function Announcements() {
  // آرایه نمونه اطلاعیه‌ها برای ساده‌تر کردن رندر
  const announcements = [
    { date: '۱۴۰۴/۵/۶', title: 'لورم ایپسوم', content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است', bg: 'bg-blueSkyLight' },
    { date: '۱۴۰۴/۵/۶', title: 'لورم ایپسوم', content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است', bg: 'bg-specialPurpleLight' },
    { date: '۱۴۰۴/۵/۶', title: 'لورم ایپسوم', content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است', bg: 'bg-specialYellowLight' },
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      {/* هدر اطلاعیه‌ها */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">اطلاعیه‌ها</h1>
        <span className="text-xs text-gray-600 cursor-pointer">دیدن همه</span>
      </div>

      {/* لیست اطلاعیه‌ها */}
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((item, index) => (
          <div key={index} className={`${item.bg} rounded-md p-4`}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">{item.date}</span>
              <h2 className="font-medium">{item.title}</h2>
            </div>
            <p className="text-sm text-gray-400 mt-1 text-right">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcements;
