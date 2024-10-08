import React, { useContext, useRef, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import AssignTaskModal from "../Tasks/AssignTaskModal";
import AhoyCaptain from "../../components/global/AhoyCaptain";
import OnboardingSuccess from "../../components/global/OnboardingSuccess";

const AddEmployeeExternal = () => {
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

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleExistingTaskSelect = () => {
    closeTaskModal();
    openManagerModal();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isAhoyOpen, setIsAhoyOpen] = useState(false);

  // Add state for tracking additional input sections
  const [i, setI] = useState(1);
  const [arr, setArr] = useState([i]);

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        {arr.map((item, key) => (
          <div
            key={key}
            className="w-full h-auto flex flex-col gap-6 justify-start items-start"
          >
            <div className="w-full h-auto flex justify-between items-center">
              <h3 className="text-[18px] font-bold leading-[24.3px]">
                {key === 0 ? "Add Employee" : "Add Another Employee"}
              </h3>
            </div>
            <div className="w-full h-auto grid grid-cols-2 gap-12">
              <AddFleetInput label={"Name"} state={"Mark Taylor"} />
              <AddFleetInput label={"Email"} state={"marktaylor@gmail.com"} />
            </div>
            <div className="w-full h-auto grid grid-cols-2 gap-12">
              <div className="flex flex-col gap-4">
                <AddFleetInput label={"Job Title"} state={"Doc Manager"} />
                <AddFleetInput
                  label={"Phone Number"}
                  state={"+1 2345678920"}
                />
              </div>
              <AddFleetInput label={"Location"} state={""} />
            </div>
          </div>
        ))}
        <div className="w-full flex justify-end mt-10 items-center gap-4">
        <button
              type="button"
              onClick={() => {
                navigate("/dashboard");
              }}
              className="w-auto h-[52px] text-[#fff]/[0.5] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              {"Skip"}
            </button>
          <button
            onClick={() => {
              setI(i + 1);
              setArr([...arr, i + 1]);
            }}
            className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Add More"}
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Save"}
          </button>

          <OnboardingSuccess
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setAhoy={setIsAhoyOpen}
          />
          <AhoyCaptain isOpen={isAhoyOpen} setIsOpen={setIsAhoyOpen} />
        </div>
      </div>
      {/* {isManagerModalOpen && (
        <ManagerDetailModal setIsOpen={setIsManagerModalOpen} />
      )}
      {isTaskModalOpen && (
        <AssignTaskModal
          isOpen={isTaskModalOpen}
          onClose={closeTaskModal}
          onExistingTaskSelect={handleExistingTaskSelect}
        />
      )} */}
    </div>
  );
};

export default AddEmployeeExternal;
