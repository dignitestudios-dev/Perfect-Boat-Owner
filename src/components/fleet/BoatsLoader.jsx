import React from 'react'

const BoatsLoader = ({index}) => {
  return (
    <div
          key={index}
          className="w-full h-auto grid grid-cols-5 cursor-default border-b border-[#fff]/[0.14] py-3 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center animate-pulse"
        >
          {/* Skeleton for image */}
          <span className="w-[106px] h-[76px] flex justify-start items-center relative">
            <div className="w-full h-full bg-gray-700 rounded-[15px] animate-pulse" />
            <div
              className="w-24"
              style={{
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to right, transparent, #001229)",
              }}
            />
          </span>
          {/* Skeleton for boat type */}
          <span className="w-full flex justify-start items-center">
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse" />
          </span>
          {/* Skeleton for boat name */}
          <span className="w-full flex justify-start items-center">
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse" />
          </span>
          {/* Skeleton for model / make / size */}
          <span className="w-full flex justify-start items-center">
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse" />
          </span>
          {/* Skeleton for location */}
          <span className="w-full flex justify-start items-center">
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse" />
          </span>
        </div>
  )
}

export default BoatsLoader