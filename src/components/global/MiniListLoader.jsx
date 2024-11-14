import React from "react";

const MiniListLoader = () => {
  return (
    <tbody>
      {[...Array(4)].map((_, index) => (
        <tr key={index} className="border-b border-[#2A394C]">
          <td className="pr-8 py-2">
            <div className="w-[140px] h-[20px] bg-gray-600 rounded animate-pulse"></div>
          </td>
          <td className="px-10 py-2">
            <div className="w-[160px] h-[20px] bg-gray-600 rounded animate-pulse"></div>
          </td>
          <td className="px-10 py-2">
            <div className="w-[160px] h-[20px] bg-gray-600 rounded animate-pulse"></div>
          </td>
          <td className="pl-10 py-2">
            <div className="w-[180px] h-[20px] bg-gray-600 rounded animate-pulse"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default MiniListLoader;
