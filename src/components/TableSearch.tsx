import Image from 'next/image';
import React from 'react';

const TableSearch = () => {
  return (
    // کانتینر اصلی جستجو
    <div className="w-full md:w-auto flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-gray-300 px-2">
      
      {/* آیکون جستجو */}
      <Image src="/search.png" alt="Search Icon" width={14} height={14} />

      {/* فیلد ورودی جستجو */}
      <input
        type="text"
        placeholder="...جستجو"
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
