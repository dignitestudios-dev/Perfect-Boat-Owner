import React, { useContext, useRef, useState } from "react";
import { TiPencil } from "react-icons/ti";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCalendarStats, TbCaretDownFilled } from "react-icons/tb";
import DateModal from "../../components/tasks/DateModal";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal";

const EditTask = () => {
  const { navigate } = useContext(GlobalContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [isTaskDropdownOpen, setIsTaskDropdownOpen ] = useState(false);
  const [isTaskTypeDropdownOpen, setIsTaskTypeDropdownOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("Inspect bottom paint for growth");


  // Declare refs
  const dropdownRef = useRef(null);
  const taskDropdownRef = useRef(null);
  const taskTypeDropdownRef = useRef(null);

  // Event handler for toggling task dropdown
  const toggleDropdown = (e) => {
    console.log("first")
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsTaskDropdownOpen((prev) => !prev);
    }
  };

  // Event handler for toggling task type dropdown
  const toggleTaskTypeDropdown = (e) => {
    if (taskTypeDropdownRef.current && !taskTypeDropdownRef.current.contains(e.target)) {
      setIsTaskTypeDropdownOpen((prev) => !prev);
    }
  };

  // Event handler for toggling employee modal
  const toggleEmployeeModal = () => {
    console.log("Toggling Employee Modal", isEmployeeModalOpen);
    setIsEmployeeModalOpen(prev => !prev);
  };

  

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="h-full w-full flex flex-col gap-6 justify-start items-center">
        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          <div className="w-full flex justify-between items-center h-12">
            <div className="w-auto flex justify-start items-center gap-2">
              <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                Edit Task
              </h3>
              <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
                In-Progress
              </span>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
            <div className="w-full h-auto grid grid-cols-2 gap-12">
              <div className="w-full lg:w-[327px] h-[90px] flex gap-3 justify-start items-center rounded-[12px] bg-[#1A293D] p-2">
                <img
                  src={AuthMockup}
                  alt="taskimage"
                  className="w-[106px] h-[74px] rounded-[12px]"
                />
                <div className="w-auto flex flex-col justify-start items-start">
                  <h3 className="text-[16px] font-medium leading-[21.6px] text-white">
                    Boat Name A
                  </h3>
                  <p className="text-[14px] font-normal text-[#199bd1]">
                    2019/Toyota/Class A
                  </p>
                </div>
              </div>
              <div className="w-full h-auto flex flex-col gap-1 justify-between items-start">
                <AddFleetInput label={"Task Created By"} state={"Jack Smith"} />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-12">
              <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">{"Task Type"}</label>
                <div
                  onClick={toggleTaskTypeDropdown}
                  className={`group transition-all duration-500 w-full ${
                    isTaskTypeDropdownOpen ? "rounded-t-xl rounded-b-none" : "rounded-xl"
                  } h-[52px] cursor-pointer bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] relative`}
                >
                  <span className="text-gray-400">Oil Cleaning</span>
                  <span className="text-gray-400">
                    <TbCaretDownFilled
                      className={`${isTaskTypeDropdownOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </span>

                  <div
                    ref={taskTypeDropdownRef}
                    className={`${
                      isTaskTypeDropdownOpen ? "flex" : "hidden"
                    } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute -bottom-40 shadow-xl left-0 w-full h-40 max-h-40 bg-[#1A293D] rounded-b-2xl`}
                  >
                    <div className="w-full h-auto overflow-y-auto">
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#1c1c1c]">
                        Task Type A
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#1c1c1c]">
                        Task Type B
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#1c1c1c]">
                        Task Type C
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#1c1c1c]">
                        Task Type D
                      </button>
                      <button
                        onClick={() => setCustomInput(true)}
                        className="w-full text-gray-300 h-8 px-5 hover:bg-[#1c1c1c] flex flex-col gap-1 justify-center relative items-start"
                      >
                        <span>Custom</span>
                        {customInput && (
                          <div className="absolute w-full top-10 left-0 flex flex-col justify-start items-start gap-2 px-5">
                            <input
                              type="text"
                              className="w-[60%] h-[42px] mb-2 bg-[#1A293D] disabled:text-white/50 outline-none px-3 border-[1px] border-[#55C9FA] rounded-md"
                            />
                            <button className="w-[95%] h-[42px] rounded-md bg-[#119bd1] text-white flex items-center justify-center text-sm font-medium">
                              Apply
                            </button>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">{"Task"}</label>
                <div
                  onClick={toggleDropdown}
                  className={`group transition-all duration-500 w-full ${
                    isTaskDropdownOpen ? "rounded-t-xl rounded-b-none" : "rounded-xl"
                  } h-[52px] cursor-pointer bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] relative`}
                >
                  <span className="text-gray-400">{selectedTask}</span>
                  <span className="text-gray-400">
                    <TbCaretDownFilled
                      className={`${isTaskDropdownOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </span>

                  <div
                    ref={dropdownRef}
                    className={`${
                      isTaskDropdownOpen ? "flex" : "hidden"
                    } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute -bottom-40 shadow-xl left-0 w-full h-40 max-h-40 bg-[#1A293D] rounded-b-2xl`}
                  >
                    <div className="w-full h-auto overflow-y-auto">
                      <button
                        onClick={() => setSelectedTask("Task A")}
                        className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#1c1c1c]"
                      >
                        Task A
                      </button>
                      <button
                        onClick={() => setSelectedTask("Task B")}
                        className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#1c1c1c]"
                      >
                        Task B
                      </button>
                      <button
                        onClick={() => setSelectedTask("Task C")}
                        className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#1c1c1c]"
                      >
                        Task C
                      </button>
                      <button
                        onClick={() => setSelectedTask("Task D")}
                        className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#1c1c1c]"
                      >
                        Task D
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-12">
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">{"Add Note"}</label>
                <textarea
                  type="text"
                  value={
                    "Lorem ipsum dolor sit amet consectetur. Sed tellus sit in diam semper sollicitudin. Non facilisis proin gravida pellentesque tortor orci id. Facilisis neque enim nisi lectus a sed et bibendum. Justo tellus ipsum eu tempus orci sed. Neque consequat sed id mauris quis lorem nisl. Massa orci adipiscing arcu placerat aliquet egestas. Quis purus nunc sodales vitae non semper enim posuere. \n \n Vel ut pulvinar faucibus praesent ut. Purus magna nec integer bibendum mauris commodo dolor id. Bibendum tempus lacus arcu neque felis lorem blandit cursus. Porttitor lorem auctor dolor egestas diam libero. Feugiat condimentum feugiat est quis egestas nibh tellus nulla auctor. Id dignissim consectetur scelerisque quis adipiscing. Nunc tincidunt amet nunc in nunc pellentesque erat aliquam. Donec pharetra scelerisque massa id cursus gravida. Mi est cursus egestas mi a faucibus. Aenean feugiat placerat iaculis semper quis aliquam non amet faucibus. Venenatis in gravida at ut risus nisi dictum condimentum integer. Integer rhoncus sit elementum morbi cras consectetur odio aliquam. Massa fermentum tincidunt sit ut pulvinar. In suspendisse vulputate elementum nisl pharetra imperdiet odio dolor nibh."
                  }
                  className="w-full h-[315px] disabled:text-white/50 resize-none bg-[#1A293D] outline-none p-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                ></textarea>
              </div>
            </div>
          </div>

          <span className="w-full h-[0.5px] bg-white/10"></span>

          <div className="w-full flex flex-col justify-start items-start gap-6">
            <div className="w-auto flex justify-start items-start gap-3">
              <IoCalendarOutline className="text-2xl text-white/40" />
              <div className="flex flex-col justify-start items-start">
                <span className="text-[16px] font-bold text-white">Due Date</span>
                <span className="text-[12px] font-normal">12/09/2023</span>
              </div>
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="text-xs flex font-normal text-[#199BD1]"
              >
                <span>Change</span>
              </button>
            </div>
            <div className="w-auto flex justify-start items-start gap-3">
              <TbCalendarStats className="text-2xl text-white/40" />
              <div className="flex flex-col justify-start items-start">
                <span className="text-[16px] font-bold text-white">Recurring Days</span>
                <span className="text-[12px] font-normal">90 days</span>
              </div>
              <button className="text-xs font-normal text-[#199BD1]">
                Change
              </button>
              <DateModal
                isOpen={isCalendarOpen}
                setIsOpen={setIsCalendarOpen}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          <div className="w-auto flex justify-start items-center gap-2">
            <h3 className="text-[18px] font-bold leading-[24.3px] text-white">Assigned Employee</h3>
            <button
              onClick={toggleEmployeeModal}
              className="w-[42px] h-[42px] rounded-[8px] text-[#55C9FA] flex justify-center items-center"
            >
              Change
            </button>
          </div>

          <div className="w-full flex flex-col gap-1 justify-start items-start">
            <div className="w-full h-6 grid grid-cols-5 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">Name</span>
              <span className="w-full flex justify-start items-center">Email</span>
              <span className="w-full flex justify-start items-center">Job Title</span>
              <span className="w-full flex justify-start items-center">Phone Number</span>
              <span className="w-full flex justify-start items-center">Location</span>
            </div>
            <div className="w-full h-10 grid grid-cols-5 py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Mike Smith</span>
              <span className="w-full flex justify-start items-center">mikesmith@gmail.com</span>
              <span className="w-full flex justify-start items-center">Dock Guard</span>
              <span className="w-full flex justify-start items-center ">+1 (295) 731-4314</span>
              <span className="w-full flex justify-start items-center ">East California Dock</span>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end py-4 items-center gap-4">
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
            onClick={() => navigate("/tasks/1", "All Tasks")}
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Save"}
          </button>
        </div>
      </div>

      {isEmployeeModalOpen && (
        <EmployeeDetailModal
          isOpen={isEmployeeModalOpen}
          setIsOpen={toggleEmployeeModal}
        />
      )}
    </div>
  );
};

export default EditTask;
