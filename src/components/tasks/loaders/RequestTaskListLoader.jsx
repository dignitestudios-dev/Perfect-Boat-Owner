import React from 'react'

const RequestTaskListLoader = () => {
  return (
    <div className="w-full flex flex-col gap-3">
    {/* Skeleton Loader for each task */}
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="w-full h-auto grid grid-cols-4 border-b border-[#fff]/[0.14] py-3 animate-pulse"
      >
        {/* Image Skeleton */}
        <div className="w-[106px] h-[76px] flex justify-start items-center relative bg-gray-700 rounded-l-md">
          <div
            className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-[#001229]"
          />
        </div>
  
        {/* Text Skeletons */}
        <div className="w-full flex justify-start items-center">
          <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full flex justify-start items-center">
          <div className="w-2/3 h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full flex justify-start items-center px-[60px]">
          <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default RequestTaskListLoader