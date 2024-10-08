import React, { useContext, useState, useRef } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCalendarStats, TbCaretDownFilled } from "react-icons/tb";
import DateModal from "../../components/tasks/DateModal";
import TaskAssignedModal from "./TaskAssignedModal";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal"; // Import the EmployeeDetailModal

const AssignReportedTask = () => {
  const { navigate } = useContext(GlobalContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for TaskAssignedModal
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false); // State for EmployeeDetailModal
  const [isRecurringDropdownOpen, setIsRecurringDropdownOpen] = useState(false); // State for Recurring Dropdown
  const RecurringRef = useRef(null); // Reference for Recurring Dropdown

  const handleAssignTask = () => {
    setIsModalOpen(true); // Show the TaskAssignedModal
  };

  const toggleRecurringDropdown = (e) => {
    if (RecurringRef.current && !RecurringRef.current.contains(e.target)) {
      setIsRecurringDropdownOpen((prev) => !prev);
    }
  };

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start ">
          <div className="w-full h-auto flex justify-between items-center">
            <h3 className="text-[18px] font-bold leading-[24.3px]">
              Assign Reported Task
            </h3>
          </div>
          <div className="w-full h-auto flex flex-col justify-start items-start gap-4 ">
            <div className="w-full grid grid-cols-2 gap-12">
              <AddFleetInput label={"Name"} />
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <AddFleetInput label={"Boat Type"} state={"Boat XYZ"} />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-12">
              <AddFleetInput label={"Modal/Make/Size"} state={"2019/Toyota/ClassA"} />
              <AddFleetInput
                label={"Location"}
                state={"Location goes here"}
              />
            </div>
            <div className="w-full grid grid-cols-1 gap-12">
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                {/* Horizontal line above the Assigned Employee label */}
                <hr className="w-full  mb-4 h-[1px] bg-[#1A293D]" />
                <div className="flex items-center justify-between">
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    {"Assigned Employee"}
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      setIsEmployeeModalOpen(true); // Show the EmployeeDetailModal
                    }}
                    className="text-[#199BD1] ml-2 text-sm font-medium hover:underline"
                  >
                    Change
                  </a>
                </div>
                <div className="w-full grid grid-cols-2 gap-12">
              <AddFleetInput />
              
            </div>
                {/* Horizontal line above the Note label */}
                <hr className="w-full border-t border-gray-600 my-4" />
                <label className="text-[16px] font-medium leading-[21.6px]">
                  {"Note"}
                </label>
                <textarea
                  type="text"
                  value="Lorem ipsum dolor sit amet consectetur. Sed tellus sit in diam semper sollicitudin. Non facilisis proin gravida pellentesque tortor orci id. Facilisis neque enim nisi lectus a sed et bibendum. Justo tellus ipsum eu tempus orci sed. Neque consequat sed id mauris quis lorem nisl. Massa orci adipiscing arcu placerat aliquet egestas. Quis purus nunc sodales vitae non semper enim posuere. \n \n Vel ut pulvinar faucibus praesent ut. Purus magna nec integer bibendum mauris commodo dolor id. Bibendum tempus lacus arcu neque felis lorem blandit cursus. Porttitor lorem auctor dolor egestas diam libero. Feugiat condimentum feugiat est quis egestas nibh tellus nulla auctor. Id dignissim consectetur scelerisque quis adipiscing. Nunc tincidunt amet nunc in nunc pellentesque erat aliquam. Donec pharetra scelerisque massa id cursus gravida. Mi est cursus egestas mi a faucibus. Aenean feugiat placerat iaculis semper quis aliquam non amet faucibus. Venenatis in gravida at ut risus nisi dictum condimentum integer. Integer rhoncus sit elementum morbi cras consectetur odio aliquam. Massa fermentum tincidunt sit ut pulvinar. In suspendisse vulputate elementum nisl pharetra imperdiet odio dolor nibh."
                  className="w-full h-[315px] resize-none bg-[#1A293D] outline-none  p-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                ></textarea>
              </div>
            </div>
          </div>
          <span className="w-full h-[0.5px] bg-white/10"></span>

          <div className="w-full flex flex-col justify-start items-start gap-6">
            <div className="w-auto flex justify-start items-center gap-3">
              <IoCalendarOutline className="text-2xl text-white/40" />
              <span className="text-md font-normal text-white">Due Date</span>
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="text-xs font-normal text-[#199BD1]"
              >
                Select Due Date
              </button>
            </div>
            <div className="w-auto flex justify-start items-center gap-3">
              <TbCalendarStats className="text-2xl text-white/40" />
              <span className="text-md font-normal text-white">
                Recurring Days
              </span>
              <button
                onClick={toggleRecurringDropdown}
                className="text-xs flex flex-col justify-start items-start font-normal text-[#199BD1] relative"
              >
                <span>Select Days</span>
                <div
                  ref={RecurringRef}
                  className={`w-[164px] h-32 overflow-y-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    isRecurringDropdownOpen ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-6 left-0`}
                >
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      None
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      30 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      45 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      60 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      90 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      180 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      1 year
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      Custom
                    </span>
                  </div>
                </div>
                <TbCaretDownFilled className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#199BD1]" />
              </button>
            </div>
          </div>
          <DateModal isOpen={isCalendarOpen} setIsOpen={setIsCalendarOpen} />
        </div>
      </div>
      <div className="w-full flex justify-end mt-10 items-center gap-4">
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
        >
          {"Back"}
        </button>
        <button
          type="button"
          onClick={handleAssignTask} // Call the assign task function
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
        >
          {"Assign Reported Task"}
        </button>
      </div>
      {/* Conditionally render the EmployeeDetailModal */}
      {isEmployeeModalOpen && (
        <EmployeeDetailModal setIsOpen={setIsEmployeeModalOpen} />
      )}

      <TaskAssignedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* Render the TaskAssignedModal */}
    </div>
  );
};

export default AssignReportedTask;
