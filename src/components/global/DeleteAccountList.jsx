import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import EmployeeDetailModal from "../../pages/Employees/EmployeeDetailModal";
import AssignManagerModal from "../../pages/Managers/AssignManagerModal";
import { useNavigate } from "react-router-dom";
import AccountDeletedModal from "./AccountDeletedModal";



const DeleteAccountList = () => {
  const [locationFilter, setLocationFilter] = useState(false);
  const [jobFilter, setJobFilter] = useState(false);
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false); // State for employee detail modal
  const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] = useState(false); // State for assign employee modal
  const [isAccountDeletedModalOpen, setIsAccountDeletedModalOpen] = useState(false); // State for delete modal

  const navigate = useNavigate();

  

  const locationRef = useRef(null);
  const jobRef = useRef(null);

  const toggleLocationDropdown = (e) => {
    if (locationRef.current && !locationRef.current.contains(e.target)) {
      setLocationFilter((prev) => !prev);
    }
  };

  const toggleJobDropdown = (e) => {
    if (jobRef.current && !jobRef.current.contains(e.target)) {
      setJobFilter((prev) => !prev);
    }
  };

  const handleSubmit = () => {
    navigate("/employees/add");
  };

  const backSubmit = () => {
    navigate("/employees");
};
  const handleDelete = () => {
    // Handle the delete action here
    // For now, just show the delete confirmation modal
    setIsAccountDeletedModalOpen(true);
};

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
            Delete Account
          </h3>
          <button
          onClick={handleSubmit}
          className="w-full lg:w-[135px] h-[35px] flex items-center gap-1 rounded-[10px] justify-center bg-[#1A293D] text-[#199BD1] text-[11px] font-bold leading-[14.85px]"
          >
            View Profile
          </button>
        </div>
        <p className="text-[16px]">
          Before deleting the account of *employee name*, please reassign the
          following tasks that are currently assigned to this employee to
          another employee.
        </p>
        <div className="w-full max-w-[500px] flex flex-col gap-2 sm:gap-4 ">
          <label className="text-[16px] font-medium leading-[21.6px] text-white">
            Assign Employee
          </label>
          <button
            onClick={() => setIsBoatModalOpen(true)} // Open the Employee Detail Modal
            className="w-full h-[52px] bg-[#1A293D] disabled:text-50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
          >
            Click here to assign
          </button>
        </div>

        <div className="w-full overflow-x-auto mt-4">
          <div className="min-w-[700px]"> {/* Increased min-width to accommodate the new column */}
            {/* Table Headings */}
            <div className="w-full grid h-10 grid-cols-5 text-[11px] font-medium leading-[14.85px] text-white/50 border-b border-[#fff]/[0.14] py-1">
              <span className="w-full flex justify-start items-center">Boat name</span>
              <span className="w-full flex justify-start items-center relative">
                Task Type
                <FaCaretDown
                  className={`ml-2 cursor-pointer ${
                    jobFilter ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={toggleJobDropdown}
                />
                <div
                  ref={jobRef}
                  className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    jobFilter ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 absolute top-full left-0 mt-1`}
                >
                  <div className="text-white/50 text-[11px] font-medium">Maintenance</div>
                  <div className="text-white/50 text-[11px] font-medium">Cleaning</div>
                  <div className="text-white/50 text-[11px] font-medium">Inspection</div>
                  <div className="text-white/50 text-[11px] font-medium">Repair</div>
                </div>
              </span>
              <span className="w-full flex justify-start items-center">Due Date</span>
              <span className="w-full flex justify-start items-center">Recurring</span> {/* New column */}
              <span className="w-full flex justify-start items-center relative">
                Status
                <FaCaretDown
                  className={`ml-2 cursor-pointer ${
                    locationFilter ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={toggleLocationDropdown}
                />
                <div
                  ref={locationRef}
                  className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    locationFilter ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 absolute top-full left-0 mt-1`}
                >
                  <div className="text-white/50 text-[11px] font-medium">In-Progress</div>
                  <div className="text-white/50 text-[11px] font-medium">Completed</div>
                  <div className="text-white/50 text-[11px] font-medium">Overdue</div>
                </div>
              </span>
            </div>

            {/* Table Content */}
            <div className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Boat A</span>
              <span className="w-full flex justify-start items-center">Maintenance</span>
              <span className="w-full flex justify-start items-center">12-2-2023</span>
              <span className="w-full flex justify-start items-center">90 days</span> {/* Recurring */}
              <span className="w-full flex justify-start items-center">
                <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2">
                  In-Progress
                </span>
              </span>
            </div>
            <div className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Boat B</span>
              <span className="w-full flex justify-start items-center">Cleaning</span>
              <span className="w-full flex justify-start items-center">15-2-2023</span>
              <span className="w-full flex justify-start items-center">90 days</span> {/* Recurring */}
              <span className="w-full flex justify-start items-center">
                <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#00CC99]/[0.12] text-[#00CC99] px-2">
                  Completed
                </span>
              </span>
            </div>
            <div className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Boat C</span>
              <span className="w-full flex justify-start items-center">Inspection</span>
              <span className="w-full flex justify-start items-center">20-2-2023</span>
              <span className="w-full flex justify-start items-center">90 days</span> {/* Recurring */}
              <span className="w-full flex justify-start items-center">
                <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FF5733]/[0.12] text-[#FF5733] px-2">
                  Overdue
                </span>
              </span>
            </div>
            <div className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Boat D</span>
              <span className="w-full flex justify-start items-center">Repair</span>
              <span className="w-full flex justify-start items-center">25-2-2023</span>
              <span className="w-full flex justify-start items-center">90 days</span> {/* Recurring */}
              <span className="w-full flex justify-start items-center">
                <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2">
                  In-Progress
                </span>
              </span>
            </div>
            <div className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Boat D</span>
              <span className="w-full flex justify-start items-center">Repair</span>
              <span className="w-full flex justify-start items-center">25-2-2023</span>
              <span className="w-full flex justify-start items-center">90 days</span> {/* Recurring */}
              <span className="w-full flex justify-start items-center">
                <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2">
                  In-Progress
                </span>
              </span>
            </div>
            <div className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Boat D</span>
              <span className="w-full flex justify-start items-center">Repair</span>
              <span className="w-full flex justify-start items-center">25-2-2023</span>
              <span className="w-full flex justify-start items-center">90 days</span> {/* Recurring */}
              <span className="w-full flex justify-start items-center">
                <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2">
                  In-Progress
                </span>
              </span>
            </div>
            <div className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Boat D</span>
              <span className="w-full flex justify-start items-center">Repair</span>
              <span className="w-full flex justify-start items-center">25-2-2023</span>
              <span className="w-full flex justify-start items-center">90 days</span> {/* Recurring */}
              <span className="w-full flex justify-start items-center">
                <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2">
                  In-Progress
                </span>
              </span>
            </div>
            <div className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Boat D</span>
              <span className="w-full flex justify-start items-center">Repair</span>
              <span className="w-full flex justify-start items-center">25-2-2023</span>
              <span className="w-full flex justify-start items-center">90 days</span> {/* Recurring */}
              <span className="w-full flex justify-start items-center">
                <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2">
                  In-Progress
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      

      {/* Action Buttons */}
      <div className="w-full mt-4 flex justify-end gap-4">
        <button
                onClick={backSubmit}
                className="w-[235px] h-[54px] bg-[#02203A] text-[#FFFFFF] font-medium rounded-lg"
        >
          Back
        </button>
        <button
          onClick={handleDelete} // Trigger delete action

          className="w-[235px] h-[54px] bg-[#199BD1] text-[#FFFFFF] font-medium rounded-lg"
        >
          Delete Account
        </button>
      </div>

      {/* EmployeeDetailModal Component */}
      {isBoatModalOpen && (
        <EmployeeDetailModal setIsOpen={setIsBoatModalOpen} />
      )}

      {/* AssignManagerModal Component */}
      {isAssignEmployeeModalOpen && (
        <AssignManagerModal
          isOpen={isAssignEmployeeModalOpen}
          onClose={() => setIsAssignEmployeeModalOpen(false)}
        />
      )}

       {/* AccountDeletedModal Component */}
       {isAccountDeletedModalOpen && (
                <AccountDeletedModal
                    isOpen={isAccountDeletedModalOpen}
                    setIsOpen={setIsAccountDeletedModalOpen}
                />
            )}  
    </div>
  );
};

export default DeleteAccountList;
