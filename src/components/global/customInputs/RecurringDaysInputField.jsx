import React from 'react'
import { FaCaretDown } from 'react-icons/fa';
import { TbCalendarStats } from 'react-icons/tb';
import { recurringOptions } from '../../../data/TaskTypeData';

const RecurringDaysInputField = ({toggleRecurringDropdown,selectedDay,RecurringRef,RecurringDropdown,handleSelectDay,
    customDays, setCustomRecurring, customRecurring, isEdit}) => {
  return (
    <div className="w-auto flex justify-start items-center gap-3">
              <TbCalendarStats className="text-2xl text-white/40" />
              <span className="text-md font-normal text-white">
                Recurring Days
              </span>
              <button
              disabled={!isEdit}
                onClick={toggleRecurringDropdown}
                className="text-xs flex flex-col justify-start items-start font-normal text-[#199BD1] relative"
              >
                <span className="flex gap-1 justify-start items-center">
                  <span>{selectedDay || "Select Days"}</span>{" "}
                  {/* Display selected day */}
                  <FaCaretDown />
                </span>
                <div
                  ref={RecurringRef}
                  className={`w-[164px] h-32 overflow-y-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    RecurringDropdown ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-6 left-0`}
                >
                  {recurringOptions?.map((option) => (
                    <div
                      key={option.value}
                      className="w-full flex justify-start items-start gap-2 cursor-pointer"
                      onClick={() =>
                        handleSelectDay(option.value, option.label)
                      }
                    >
                      <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                        {option.label}
                      </span>
                    </div>
                  ))}
                  {customDays && (
                    <div className="w-full flex flex-col justify-start items-start">
                      <input
                      placeholder="In count"
                        onChange={(e) => setCustomRecurring(e.target.value)}
                        type="text"
                        className="w-[95%] h-[42px] mb-2 bg-[#1A293D] disabled:text-white/50 outline-none px-3
                               border-[1px] border-[#55C9FA] rounded-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDay(customRecurring,customRecurring+"days");
                        }}
                        className="w-[95%] h-[42px] rounded-md bg-[#119bd1] text-white flex items-center 
                            justify-center text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </button>
            </div>
  )
}

export default RecurringDaysInputField