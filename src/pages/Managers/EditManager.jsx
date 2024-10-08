import React, { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { FaRegEdit, FaCaretDown } from "react-icons/fa"; // Import dropdown icon
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ResetPassModal from "../../components/onboarding/ResetPassModal"; // Adjust the import path as needed
import AssignedModal from "../Tasks/AssignedModal";
import ManagerDetailModal from "../Managers/ManagerDetailModal"; // Adjust the import path as needed
import ResendModal from "../onboarding/ResendModal";
import BoatsRightsModal from "../Fleet/BoatsRightsModal";
import AssignEmployeeDetailModal from "../Employees/AssignEmployeeDetailModal";

const Dropdown = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-left w-full flex justify-start items-center gap-1"
        onClick={handleToggle}
      >
        {label}
        <FaCaretDown />
      </button>
      {isOpen && (
        <ul className="absolute z-10 bg-[#1A293D] text-white/50 text-[11px] rounded-[8px] mt-1 p-2 w-48">
          {options.map((option, index) => (
            <li key={index} className="py-1 px-2 hover:bg-[#199BD1] cursor-pointer flex items-center gap-2">
              <input type="checkbox" className="form-checkbox h-3 w-3 text-[#199BD1]" />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EditManager = () => {
  const { navigate } = useContext(GlobalContext);
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignedModalOpen, setIsAssignedModalOpen] = useState(false);
  const [isManagerDetailModalOpen, setIsManagerDetailModalOpen] = useState(false); // New state for 
  const [isResendModalOpen, setIsResendModalOpen] = useState(false); // State for ResendModal
  const [isAssignDetailModalOpen, setIsAssignDetailModalOpen] = useState(false);
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(true);  // Added this state
  const [managerName, setManagerName] = useState("*Manager Name*");  // Added state for manager name







  const handleViewAllClick = () => {
    setIsAssignedModalOpen(true); // Open AssignedModal instead of navigating
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResetPassClick = () => {
    setIsResetPassModalOpen(true);
  };

  const handleResetModal = () => {
    setIsResendModalOpen(true); // Open ResendModal

  };

  const handleChangeClick = () => {
    // setIsManagerDetailModalOpen(true); // Open ManagerDetailModal
    setManagerName("Manager Name");  // Change the manager's name
    setIsEditVisible(false);  // Hide the "Edit Details" button


  };

  const handleViewBoatsClick = () => {
    setIsModalOpen(true);
  };


  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto bg-[#1A293D] text-white flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
  <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
            <div className="flex flex-col lg:flex-row items-start lg:gap-[720px] justify-between sm:gap-3">
              <h3 className="text-[18px] font-bold leading-[24.3px]">{managerName}</h3>
            </div>
            {isEditVisible && (
              <div className="flex lg:justify-end lg:ml-auto gap-4">
                <button
                  className="flex items-center gap-2 text-[#199BD1] font-medium bg-[#002240] px-4 py-2 rounded-lg"
                  onClick={handleChangeClick}
                >
                  Edit Details
                </button>
              </div>
            )}
          </div>
          <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-full h-auto flex flex-col justify-start items-start gap-6">
                <div className="w-full grid grid-cols-2 gap-12">
                  <AddFleetInput label={"Name"} state={"David Beckham"} />
                  <AddFleetInput label={"Email"} state={"david@gmail.com"} />
                </div>
                <div className="w-full grid grid-cols-2 gap-12">
                  <AddFleetInput label={"Job Title"} state={"Dock manager"} />
                  <AddFleetInput
                    label={"Location"}
                    state={"East California dock"}
                  />
                </div>
                <div className="w-full grid grid-cols-2 gap-12">
                  <AddFleetInput label={"Phone Number"} state={"000000000"} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 justify-start items-start mt-14 py-6 border-t-[1px] border-white/10">
            <div className="w-full flex justify-between items-center">
              <div className="w-auto flex gap-2 justify-start items-center">
                <h3 className="text-[18px] font-bold leading-[24.3px]">
                  Resend Password
                </h3>
                <button
                  className="text-[14px] font-medium text-[#199bd1]"
                  onClick={handleResetModal} // Update to open ResendModal
                >
                  Resend
                </button>
              </div>
              <button
                onClick={handleResetPassClick}
                className="text-[14px] text-md font-medium text-[#199BD1] items-end bg-[#199bd1]/[0.2] h-10 rounded-full w-[130px]"
              >
                Reset Password
              </button>
            </div>

            <div className="w-auto flex flex-col justify-start items-start gap-3">
              <div className="flex justify-start items-center gap-2 text-white text-[16px] font-normal leading-[21.6px]">
                <span className="text-white/50">Email:</span>
                <span>marktaylor12345@gmail.com</span>
              </div>
              <div className="flex justify-start items-center gap-2 text-white text-[16px] font-normal leading-[21.6px]">
                <span className="text-white/50">Password:</span>
                <span>Pass12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <div className="w-auto flex justify-between items-center gap-2">
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
            Assign Employees{" "}
          </h3>
          <button
            onClick={() => setIsAssignDetailModalOpen(true)} 
            className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199BD1]"
          >
            View All
          </button>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <div className="w-full h-6 grid grid-cols-4 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center">
            <span className="w-full flex justify-start items-center">
              Employee Name
            </span>
            
            <span className="w-full flex justify-start items-center">
              Email
            </span>
            <div className="w-full flex justify-start items-center">
              <Dropdown label="Job Title" options={["Doc Manager", "Doc Manager", "Doc Manager"]} />
            </div>
    
            <div className="w-full flex justify-start items-center">
              <Dropdown label="Location" options={["East California Dock", "East California Dock", "East California Dock"]} />
            </div>
    
          </div>
          <div className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
            <span className="w-full flex justify-start items-center">
              Mark Taylor
            </span>
            <span className="w-full flex justify-start items-center">
              markT@gmail.com
            </span>
            <span className="w-full flex justify-start items-center">
              Doc guard
            </span>
            <span className="w-full flex justify-start items-center ">
              East California Dock
            </span>
            <span className="w-full flex justify-start items-center ">
           
          </span>
        
          </div>
          {/* Add more rows as needed */}
        </div>
      </div>




      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <div className="w-auto flex justify-between items-center gap-2">
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
            Access Boats{" "}
          </h3>
          <button onClick={handleViewBoatsClick} className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199BD1]"
          >
        View All
      </button>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
        <p className="mb-2 text-md">*Manager Name* has access to all boats by default</p>
          <div className="w-full h-6 grid grid-cols-4 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center">
            <span className="w-full flex justify-start items-center">
              Type 
            </span>
            
            <span className="w-full flex justify-start items-center">
              Name
            </span>
            <span className="w-full flex justify-start items-center">
              Model/Make/Size
            </span>
    
            <div className="w-full flex justify-start items-center">
              <Dropdown label="Location" options={["East California Dock", "East California Dock", "East California Dock"]} />
            </div>
    
          </div>
          <div className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
            <span className="w-full flex justify-start items-center">
              Type goes here
            </span>
            <span className="w-full flex justify-start items-center">
              boat name
            </span>
            <span className="w-full flex justify-start items-center">
              2019/Toyota/Class A
            </span>
            <span className="w-full flex justify-start items-center ">
              East California Dock
            </span>
            <span className="w-full flex justify-start items-center ">
           
          </span>
        
          </div>
          {/* Add more rows as needed */}
        </div>
      </div>





      <div className="w-full flex justify-end mt-10 items-center gap-4">
        <button className="text-white bg-[#199BD1] hover:bg-[#006bb3] text-[16px] font-medium px-6 py-2 rounded-lg w-60 h-14">
         Back
        </button>
      </div>
      <ResetPassModal
  isOpen={isResetPassModalOpen}
  onClose={() => setIsResetPassModalOpen(false)}
/>

{isAssignedModalOpen && (
        <AssignedModal
          handleViewAllClick={handleViewAllClick} // Pass the function if needed in the modal
          setIsOpen={setIsAssignedModalOpen}
        />
      )}

{isManagerDetailModalOpen && (
        <ManagerDetailModal
          setIsOpen={setIsManagerDetailModalOpen} // Pass the function to close the modal
        />
      )}

{isResendModalOpen && (
        <ResendModal
          isOpen={isResendModalOpen}
          onClose={() => setIsResendModalOpen(false)} // Close ResendModal
        />
      )}

      {isAssignDetailModalOpen && (
  <AssignEmployeeDetailModal setIsOpen={setIsAssignDetailModalOpen} />
)}


<BoatsRightsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

    </div>
  );
};

export default EditManager;
