import React, { useContext, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown, FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GlobalContext } from "../../contexts/GlobalContext";
import DeleteAccount from "../global/DeleteAccount";
import DeactivateAccountModal from "../../pages/Employees/DeactivateAccountModal";
import DeleteManagerAccountModal from "../global/DeleteManagerAccountModal";


const ManagerTableBig = ({data}) => {
  const { navigate } = useContext(GlobalContext);
  const [jobFilter, setJobFilter] = useState(false);
  const jobRef = useRef(null);
  const [locationFilter, setLocationFilter] = useState(false);
  const locationRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);




  const toggleJobModal = (e) => {
    if (jobRef.current && !jobRef.current.contains(e.target)) {
      setJobFilter((prev) => !prev);
    }
  };
  const toggleLocationModal = (e) => {
    if (locationRef.current && !locationRef.current.contains(e.target)) {
      setLocationFilter((prev) => !prev);
    }
  };

  const handleEditClick = () => {
    navigate("/edit-manager");
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeactivate = () => {
    setIsDeactivateModalOpen(true);
    setIsModalOpen(false); // Close the delete modal when deactivate modal opens
  };

  const handleDelete = () => {
    console.log("Called")
    setIsAccountDeleteModalOpen(true); // Open the delete modal
    setIsModalOpen(false); // Close the delete modal when deactivate modal opens

  };

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        Manager List
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
          <span className="w-[32px] h-full flex items-center justify-center">
            <FiSearch className="text-white/50 text-lg" />
          </span>
          <input
            type="text"
            placeholder="Search here"
            className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
          />
        </div>

        <button
          onClick={() => navigate("/add-employee", "Employees")}
          className="h-[32px] w-[104px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1] text-white text-[11px] font-bold leading-[14.85px]"
        >
          <span className="text-[11px]">+</span>
          Add Manager
        </button>
      </div>

      <div className="w-full overflow-x-auto lg:overflow-visible">
        <div className="min-w-[768px] flex flex-col gap-1 justify-start items-start">
          <div className="w-full grid grid-cols-5 text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
            <span className="w-full flex justify-start items-center">
              Manager Name
            </span>
            <span className="w-full flex justify-start items-center">
              Email
            </span>
            <button
              onClick={toggleJobModal}
              className="w-auto flex flex-col gap-1 justify-start items-start relative"
            >
              <div className="w-auto flex gap-1 justify-start items-center">
                <span>Job Title</span>
                <FaCaretDown />
              </div>
              <div
                ref={jobRef}
                className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                  jobFilter ? "scale-100" : "scale-0"
                } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-6 left-0`}
              >
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                    Doc Manager 1
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                    Doc Manager 2
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                    Doc Manager 3
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                    Doc Manager 4
                  </span>
                </div>
              </div>
            </button>

            <button
              onClick={toggleLocationModal}
              className="w-auto flex flex-col gap-1 justify-start items-start relative"
            >
              <div className="w-auto flex gap-1 justify-start items-center">
                <span>Location</span>
                <FaCaretDown />
              </div>
              <div
                ref={locationRef}
                className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                  locationFilter ? "scale-100" : "scale-0"
                } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-6 left-0`}
              >
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white text-[11px] font-medium leading-[14.85px]">
                    Location A
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white text-[11px] font-medium leading-[14.85px]">
                    Location B
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white text-[11px] font-medium leading-[14.85px]">
                    Location C
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white text-[11px] font-medium leading-[14.85px]">
                    Location D
                  </span>
                </div>
              </div>
            </button>
            <span className="w-full flex justify-start items-center px-[170px]">
              Action
            </span>
          </div>

          {/* Example Data Rows */}
          {/* <div className="w-full h-10 grid grid-cols-5 border-b cursor-pointer border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
            <span
              onClick={() => navigate("/edit-manager", "Employees")}
              className="w-full flex justify-start items-center cursor-pointer"
            >
              Mike Smith
            </span>
            <span className="w-full flex justify-start items-center">
              mikesmith@gmail.com
            </span>
            <span className="w-full flex justify-start items-center">
              Dock Guard
            </span>
            <span className="w-full flex justify-start items-center">
              East California Dock
            </span>
            <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2 px-[170px]">
              <span
                className="flex justify-start items-center"
                onClick={handleEditClick}
              >
                <FaRegEdit />
              </span>
              <span
                className="flex justify-start items-center"
                onClick={handleDeleteClick}
              >
                <RiDeleteBinLine />
              </span>
            </div>
          </div> */}
          {data?.map((manager, index) => (
          <div className="w-full h-8 grid grid-cols-5 border-b cursor-pointer border-white/10  text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
            <span
              key={index}
              className="w-full flex justify-start items-center"
              onClick={() => navigate("/employees/1", "Employees")}
            >
            {manager?.name}
            </span>
            <span className="w-full flex justify-start items-center">
            {manager?.email}
            </span>
            <span className="w-full flex justify-start items-center">
              Dock Guard
            </span>
            <span className="w-full flex justify-start items-center">
            {manager?.location}
            </span>
            <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2 px-[170px]">
              <span
                className="flex justify-start items-center"
                onClick={handleEditClick}
              >
                <FaRegEdit />
              </span>
              <span
                className="flex justify-start items-center"
                onClick={handleDeleteClick}
              >
                <RiDeleteBinLine />
              </span>
            </div>
          </div>
          ))}

          {/* Repeat above div block as needed */}

           {/* DeleteAccount Modal */}
      <DeleteAccount 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onDeactivate={handleDeactivate} 
        onDelete={handleDelete} // Pass the handler to open the delete modal

      />
       <DeactivateAccountModal
        isOpen={isDeactivateModalOpen}
        setIsOpen={setIsDeactivateModalOpen}
      />

     <DeleteManagerAccountModal
    isOpen={isAccountDeleteModalOpen}
    onClose={() => setIsAccountDeleteModalOpen(false)} // Add a way to close the modal
    />
      
    </div>
        </div>
      </div>
  );
};

export default ManagerTableBig;
