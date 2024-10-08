import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AccountDeletedModal from "./AccountDeletedModal";
import EmployeeDetailModal from "../../pages/Managers/ManagerDetailModal"

const DeleteManagerAccount = () => {
    const [locationFilter, setLocationFilter] = useState(false);
    const [jobFilter, setJobFilter] = useState(false);
    const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
    const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] = useState(false);
    const [isAccountDeletedModalOpen, setIsAccountDeletedModalOpen] = useState(false); // State for delete modal
    const navigate = useNavigate();

    const locationRef = useRef(null);
    const jobRef = useRef(null);

    const handleSubmit = () => {
        navigate("/managers/add");
    };
    const backSubmit = () => {
        navigate("/managers");
    };

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
                <div className="w-full max-w-[500px] flex flex-col gap-2 sm:gap-4 lg:gap-6">
                    <label className="text-[16px] font-medium leading-[21.6px] text-white">
                        Select Manager
                    </label>
                    <button
                        onClick={() => setIsBoatModalOpen(true)}
                        className="w-full h-[52px] bg-[#1A293D] disabled:text-50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                    >
                        Click Here To Select Manager
                    </button>
                </div>

                <div className="w-full overflow-x-auto mt-4">
                    <div className="min-w-[600px]">
                        {/* Table Headings */}
                        <div className="w-full grid h-10 grid-cols-10 text-[11px] font-medium leading-[14.85px] text-white/50 border-b border-[#fff]/[0.14] py-1">
                            <div className="flex items-center px-2 col-span-2">
                                <span className="text-white/50">Name</span>
                            </div>
                            <div className="flex items-center px-2 col-span-3">
                                <span className="text-white/50">Email</span>
                            </div>
                            <div className="flex items-center px-2 col-span-2 relative">
                                <span className="text-white/50">Job Title</span>
                                <button onClick={toggleJobDropdown} className="ml-1">
                                    <FaCaretDown className="text-white/50 text-sm" />
                                </button>
                                <div
                                    ref={jobRef}
                                    className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                                        jobFilter ? "scale-100" : "scale-0"
                                    } flex flex-col gap-3 shadow-lg p-3 absolute top-full left-0 mt-1`}
                                >
                                    <div className="text-white/50 text-[11px] font-medium">
                                        Dock Guard
                                    </div>
                                    <div className="text-white/50 text-[11px] font-medium">
                                        Boat Captain
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center px-2 col-span-2 relative">
                                <span className="text-white/50">Location</span>
                                <button onClick={toggleLocationDropdown} className="ml-1">
                                    <FaCaretDown className="text-white/50 text-sm" />
                                </button>
                                <div
                                    ref={locationRef}
                                    className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                                        locationFilter ? "scale-100" : "scale-0"
                                    } flex flex-col gap-3 shadow-lg p-3 absolute top-full left-0 mt-1`}
                                >
                                    <div className="text-white/50 text-[11px] font-medium">
                                        East California Dock
                                    </div>
                                    <div className="text-white/50 text-[11px] font-medium">
                                        West California Dock
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table Content */}
                        {Array(10)
                            .fill()
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="w-full h-10 grid grid-cols-10 border-b border-[#fff]/[0.14] text-[11px] font-medium leading-[14.85px] text-white"
                                >
                                    <span className="col-span-2 flex items-center px-2">
                                        Mike Smith
                                    </span>
                                    <span className="col-span-3 flex items-center px-2">
                                        mikesmith@gmail.com
                                    </span>
                                    <span className="col-span-2 flex items-center px-2">
                                        Dock Guard
                                    </span>
                                    <span className="col-span-3 flex items-center px-2">
                                        East California Dock
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full mt-4 flex justify-end gap-4">
                <button
                onClick={backSubmit}
                    className="w-[235px] h-[54px] bg-[#02203A] text-[#FFFFFF] text-[16px] rounded-lg"
                >
                    Back
                </button>
                <button
                    onClick={handleDelete} // Trigger delete action
                    className="w-[235px] h-[54px] bg-[#199BD1] text-[#FFFFFF] text-[16px] rounded-lg"
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

export default DeleteManagerAccount;
