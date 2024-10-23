import React from 'react'

const ManagerDetailLoader = () => {
  return (
    <div className="w-full flex flex-col gap-2">
  {[...Array(2)].map((_, index) => (
    <div
      key={index}
      className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 animate-pulse"
    >
      {/* Boat Type Skeleton */}
      <div className="w-full flex justify-start items-center">
        <div className="w-2/3 h-4 bg-gray-700 rounded"></div>
      </div>

      {/* Boat Name Skeleton */}
      <div className="w-full flex justify-start items-center">
        <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
      </div>

      {/* Boat Make, Model, Size Skeleton */}
      <div className="w-full flex justify-start items-center">
        <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
      </div>

      {/* Boat Location Skeleton */}
      <div className="w-full flex justify-start items-center">
        <div className="w-1/3 h-4 bg-gray-700 rounded"></div>
      </div>

      <span className="w-full flex justify-start items-center"></span>
    </div>
  ))}
</div>
  )
}

export default ManagerDetailLoader