import React from "react";

// تعریف نوع Props جدول
type TableProps<T> = {
  columns: { header: string; accessor: string; className?: string }[];
  data: T[];
  renderRow: (item: T) => React.ReactNode; // رندر هر ردیف باید فقط <tr> برگرداند
};

const Table = <T,>({ columns, data, renderRow }: TableProps<T>) => {
  return (
    <table className="w-full mt-4">
      {/* هدر جدول */}
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      {/* بدنه جدول */}
      <tbody>
        {data.map((item, index) => (
          // اطمینان از اینکه هر ردیف فقط <tr> دارد
          <React.Fragment key={index}>{renderRow(item)}</React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
