import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'

const ManagersTableRow = () => {
  return (
    
    <div className="w-full h-10 grid grid-cols-5 border-b cursor-pointer border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
    <span
      onClick={() => navigate("/edit-manager", "Employees")}
      className="w-full flex justify-start items-center cursor-pointer"
    >
      Mike Smith
    </span>
    <span className="w-full flex justify-start items-center">
      mikesmith@gmail.com
    </span>
    <span className="w-full flex justify-start items-center">
      Dock Guard
    </span>
    <span className="w-full flex justify-start items-center">
      East California Dock
    </span>
    <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2 px-[170px]">
      <span
        className="flex justify-start items-center"
        onClick={handleEditClick}
      >
        <FaRegEdit />
      </span>
      <span
        className="flex justify-start items-center"
        onClick={handleDeleteClick}
      >
        <RiDeleteBinLine />
      </span>
    </div>
  </div>
  )
}

export default ManagersTableRow