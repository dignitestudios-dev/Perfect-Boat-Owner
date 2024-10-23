import React, { useContext, useRef, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
// import AssignTaskModal from "../Tasks/AssignTaskModal";

const AddEmployeePlus = () => {
  const { navigate } = useContext(GlobalContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState(false);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsTaskDropdownOpen((prev) => !prev);
    }
  };

  const openManagerModal = () => {
    setIsManagerModalOpen(true);
  };

  const closeManagerModal = () => {
    setIsManagerModalOpen(false);
  };

  const openTaskPage = () => {
    navigate('/add-task');  // Navigate to /add-task instead of opening a modal
  };

  const handleExistingTaskSelect = () => {
    closeTaskModal();
    openManagerModal();
  };

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start ">
          <div className="w-full h-auto flex justify-between items-center">
            <h3 className="text-[18px] font-bold leading-[24.3px]">
              Add Employee
            </h3>

            <button className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-[11px] font-bold leading-5">
              Import CSV
            </button>
          </div>
          <div className="w-full h-auto grid grid-cols-2 gap-12">
            <AddFleetInput label={"Name"} state={"Mark Taylor"} />
            <AddFleetInput label={"Email"} state={"marktaylor@gmail.com"} />
          </div>
          <div className="w-full h-auto grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <AddFleetInput label={"Job Title"} state={"Doc Manager"} />
              <AddFleetInput label={"Phone Number"} state={"+1 2304869786"} />
            </div>
            <AddFleetInput label={"Location"} state={""} />
          </div>
          <span className="w-full h-[0.5px] bg-white/10"></span>
          <div className="w-full flex flex-col justify-start items-start gap-6"></div>
          <div className="w-full h-auto grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <AddFleetInput
                label={"Assign Managers"}
                state={"Click here to assign"}
                onClick={openManagerModal}
              />
              <AddFleetInput
                label={"Assign Task"}
                state={"Click here to assign"}
                onClick={openTaskPage}  // Updated to use openTaskPage
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-10 items-center gap-4">
          <button className="w-full lg:w-[208px] h-[52px] bg-[#1A293D] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]">
            {"Generate Credentials"}
          </button>
          <button className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]">
            {"Save"}
          </button>
        </div>
      </div>
      {isManagerModalOpen && (
        <ManagerDetailModal setIsOpen={setIsManagerModalOpen} />
      )}
    </div>
  );
};

export default AddEmployeePlus;
