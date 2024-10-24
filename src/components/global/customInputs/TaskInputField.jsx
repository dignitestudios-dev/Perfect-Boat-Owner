import React from 'react'
import { TbCaretDownFilled } from 'react-icons/tb'

const TaskInputField = ({isEdit, handleTaskSelection,toggleTaskDropdown,isTaskDropdownOpen,displaySelectedTask,additionalDropdownRef,tasks}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  Task
                </label>
                <div
                  onClick={isEdit ? toggleTaskDropdown : null}
                  className={`group transition-all duration-500 w-full ${
                    isTaskDropdownOpen
                      ? "rounded-t-xl rounded-b-none"
                      : "rounded-xl"
                  } h-[52px] ${
                    isEdit && "cursor-pointer"
                  } bg-[#1A293D] outline-none flex justify-between items-center px-3 relative`}
                >
                  <span className="text-gray-400">
                    {displaySelectedTask || "Select Task"}{" "}
                  </span>
                  <span className="text-gray-400">
                    <TbCaretDownFilled
                      className={`${
                        isTaskDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </span>
                  {/* Dropdown menu for tasks */}
                  <div
                    ref={additionalDropdownRef}
                    className={`${
                      isTaskDropdownOpen ? "flex" : "hidden"
                    } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute top-[54px]
                    shadow-xl left-0 w-full max-h-40 overflow-y-auto bg-[#1A293D] rounded-b-2xl`}
                  >
                    {tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <button
                          key={index}
                          onClick={() => handleTaskSelection(task)}
                          className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10"
                        >
                          {task}
                        </button>
                      ))
                    ) : (
                      <span className="text-gray-400 px-5">
                        No tasks on the horizon? Assign tasks to keep the crew engaged
                        and productive!
                      </span>
                    )}
                  </div>
                </div>
              </div>
  )
}

export default TaskInputField