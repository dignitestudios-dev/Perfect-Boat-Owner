import React from 'react'

const SelectEmployeeInputField = ({setIsEmployeeModalOpen,passSelectedEmployee, isEdit}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  Assign Employee
                </label>
                <button
                disabled={!isEdit}
                  onClick={() => setIsEmployeeModalOpen(true)} // Open the Employee Modal
                  className="w-full h-[52px] bg-[#1A293D] disabled:text-white/50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                >
                  <span className="w-full text-gray-400 flex justify-start">
                    {/* Display text or employee name here */}
                    {passSelectedEmployee?.name || "Assign Employee"}
                  </span>
                </button>
              </div>
  )
}

export default SelectEmployeeInputField