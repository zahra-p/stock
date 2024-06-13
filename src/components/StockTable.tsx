import React, { useState, useMemo } from "react";
import { Stock, StockTableProps } from "../types/types";

const formatNumber = (num: number): string => {
  if (Math.abs(num) >= 1.0e9) {
    return (num / 1.0e9).toFixed(2) + "B";
  }
  if (Math.abs(num) >= 1.0e6) {
    return (num / 1.0e6).toFixed(2) + "M";
  }
  if (Math.abs(num) >= 1.0e3) {
    return (num / 1.0e3).toFixed(2) + "K";
  }
  return num.toFixed(2);
};

const StockTable: React.FC<StockTableProps> = ({ stocks }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Stock;
    direction: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredStocks = useMemo(() => {
    let sortableStocks = [...stocks];

    // Filter stocks based on search term
    if (searchTerm) {
      sortableStocks = sortableStocks.filter(
        (stock) =>
          stock.l18.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.l30.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(stock.mv).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort stocks based on sortConfig
    if (sortConfig !== null) {
      sortableStocks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableStocks;
  }, [stocks, sortConfig, searchTerm]);

  const requestSort = (key: keyof Stock) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: keyof Stock) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="جستجو..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <table dir="rtl" className="min-w-full divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("l18")}
            >
              نماد
              <span className={getClassNamesFor("l18")}></span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("l30")}
            >
              نام
              <span className={getClassNamesFor("l30")}></span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("mv")}
            >
              قیمت
              <span className={getClassNamesFor("mv")}></span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedAndFilteredStocks.slice(0, 7).map((stock) => (
            <tr
              key={stock.l18}
              className="hover:bg-gray-100 transition duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {stock.l18}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stock.l30}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {typeof stock.mv === "number"
                  ? formatNumber(stock.mv)
                  : stock.mv}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
