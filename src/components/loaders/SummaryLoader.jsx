import React from "react";

const SummaryLoader = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      
      <div className="w-full flex justify-between items-center">
        <div className="h-6 w-3/4 bg-gray-700 animate-pulse rounded"></div>
      </div>

      <div className="w-full">
        <div className="h-4 w-full bg-gray-700 animate-pulse rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-700 animate-pulse rounded"></div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="h-6 w-1/2 bg-gray-700 animate-pulse rounded"></div>
        <div className="w-full p-4 bg-gray-800 rounded-xl border border-gray-600 grid gap-4 grid-cols-1 lg:grid-cols-8">
          <div className="col-span-1 lg:col-span-1 h-8 w-12 bg-gray-700 animate-pulse rounded"></div>
          <div className="col-span-1 lg:col-span-3 h-6 w-3/4 bg-gray-700 animate-pulse rounded"></div>
          <div className="col-span-1 lg:col-span-2 h-6 w-1/2 bg-gray-700 animate-pulse rounded"></div>
          <div className="col-span-1 lg:col-span-2 h-6 w-1/2 bg-gray-700 animate-pulse rounded"></div>
        </div>
      </div>

      <div className="w-full flex justify-end items-center gap-2">
        <div className="h-6 w-1/4 bg-gray-700 animate-pulse rounded"></div>
        <div className="h-8 w-1/6 bg-gray-700 animate-pulse rounded"></div>
        <div className="h-4 w-12 bg-gray-700 animate-pulse rounded"></div>
      </div>

      <div className="w-full flex justify-end gap-2">
        <div className="w-full lg:w-[180px] h-[48px] bg-gray-700 animate-pulse rounded-md"></div>
        <div className="w-full lg:w-[180px] h-[48px] bg-gray-700 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
};

export default SummaryLoader;
