// AssignmentListPage.tsx
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";

type AssignmentList = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: Date;
};

const formatDateSafe = (dateValue: Date | undefined): string => {
  if (!dateValue) return "نامعتبر";
  if (isNaN(dateValue.getTime())) return "نامعتبر";
  return new Intl.DateTimeFormat("fa-IR").format(dateValue);
};

const columns = [
  { header: "ماده درسی", accessor: "subject" },
  { header: "کلاس", accessor: "class", className: "hidden md:table-cell" },
  { header: "معلم", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "مهلت", accessor: "dueDate", className: "hidden md:table-cell" },
  { header: "اعمال", accessor: "actions" },
];

const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-specialPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.subject}</td>
    <td className="hidden md:table-cell">{item.class}</td>
    <td className="hidden md:table-cell">{item.teacher}</td>
    <td className="hidden md:table-cell">{formatDateSafe(item.dueDate)}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AssignmentListPage = () => {
  const data = assignmentsData;
  const count = data.length;
  const page = 1;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-specialYellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>
            {role === "admin" && <FormModal table="assignment" type="create" />}
            <TableSearch />
          </div>
        </div>
        <h1 className="hidden md:block text-lg font-semibold">همه تکالیف</h1>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={page} count={count} />
    </div>
  );
};

export default AssignmentListPage;