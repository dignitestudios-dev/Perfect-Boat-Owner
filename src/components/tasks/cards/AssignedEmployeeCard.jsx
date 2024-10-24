import React from 'react'

const AssignedEmployeeCard = ({taskDetail, setIsEmployeeModalOpen}) => {
  return (
    <div className="w-full flex flex-col gap-1 justify-start items-start">
            <div className="w-full h-6 grid grid-cols-5 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-[60px] overflow-hidden flex justify-start items-center">
                Name
              </span>
              <span className="w-[140px] overflow-hidden flex justify-start items-center">
                Email
              </span>
              <span className="w-full flex justify-start items-center">
                Job Title
              </span>
              <span className="w-full flex justify-start items-center">
                Phone Number
              </span>
              <span className="w-full flex justify-start items-center">
                Location
              </span>
            </div>
            {taskDetail?.assignTo?.map((employee, index)=>(
              <span key={index} className="w-full h-10 grid grid-cols-5 py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-[80px] overflow-hidden flex justify-start items-center">
                {employee?.name}
              </span>
              <span className="w-[180px] overflow-hidden flex justify-start items-center">
                {employee?.email}
              </span>
              <span className="w-full flex justify-start items-center">
                {employee?.name}
              </span>
              <span className="w-full flex justify-start items-center ">
                {employee?.phoneNumber}
              </span>
              <span className="w-full flex justify-start items-center ">
                {employee?.location?? "---"}
              </span>
            </span>
            ))}
          </div>
  )
}

export default AssignedEmployeeCard