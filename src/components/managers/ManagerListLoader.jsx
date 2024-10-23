import React from 'react'

const ManagerListLoader = () => {
  return (
    Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-8 grid grid-cols-5 border-b border-white/10 cursor-pointer animate-pulse"
        >
          <span className="w-full h-4 bg-gray-700 rounded col-span-1 mx-1"></span>
          <span className="w-full h-4 bg-gray-700 rounded col-span-1 mx-1"></span>
          <span className="w-full h-4 bg-gray-700 rounded col-span-1 mx-1"></span>
          <span className="w-full h-4 bg-gray-700 rounded col-span-1 mx-1"></span>
          <span className="w-full h-4 bg-gray-700 rounded col-span-1 mx-1"></span>
          <div className="w-full flex justify-start items-center gap-2 mx-1 px-[170px]">
            <span className="h-4 w-4 bg-gray-700 rounded mx-1"></span>
            <span className="h-4 w-4 bg-gray-700 rounded"></span>
          </div>
        </div>
      ))
  )
}

export default ManagerListLoader