import React, { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown, FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GlobalContext } from "../../contexts/GlobalContext";
import DeleteAccount from "../global/DeleteAccount";
import DeactivateAccountModal from "../../pages/Employees/DeactivateAccountModal";
import DeleteManagerAccountModal from "../global/DeleteManagerAccountModal";
import ManagerListLoader from "./ManagerListLoader";
import axios from "../../axios";
import { ErrorToast } from "../global/Toaster";
import JobType from "../global/headerDropdowns/JobType";
import LocationType from "../global/headerDropdowns/LocationType";
import Pagination from "../global/pagination/Pagination";


const ManagerTableBig = ({data, loading, getManagers}) => {
  const { navigate,setUpdateManager } = useContext(GlobalContext); 
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);
  const [managerId, setManagerId] = useState("")
  const [deactivateLoading, setDeactivateLoading] = useState(false)

  const filteredData = data.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const [locationType, setLocationType] = useState("all")
  const [jobType, setJobType] = useState("all")

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const handleEditClick = (managerData) => {
    navigate(`/edit-manager/${managerData?._id}`, { state: managerData });
  };

  const handleDeleteClick = (managerID) => {
    setManagerId(managerID)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeactivate = async () => {
    try {
      setDeactivateLoading(true)
      const obj = { reason: "Deactivate"}
      const response = await axios.delete(`/owner/manager/${managerId}?deactivate=true`, {data: obj });

      console.log("🚀 ~ handleDeactivate ~ response:", response)
      if (response?.status === 200) {
        console.log("if call")
        setUpdateManager((prev) => !prev);
        setIsDeactivateModalOpen(true);
        setIsModalOpen(false);
        getManagers()
      }
    } catch (err) {
      console.log("error call")
      ErrorToast(err?.response?.data?.message);
    }
    finally{
      setDeactivateLoading(false)
    }
  };

  const handleDelete = () => {
    console.log("habdle delete call")
    setIsAccountDeleteModalOpen(true);
    // setIsModalOpen(false); 
  };

  useEffect(()=>{
    getManagers(1,15,jobType, locationType)
  },[jobType, locationType])

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
          onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search here"
            className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
          />
        </div>

        <button
          onClick={() => navigate("/managers/add", "Managers")}
          className="h-[32px] w-[104px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1] text-white text-[11px] font-bold leading-[14.85px]"
        >
          <span className="text-[11px]">+</span>
          Add Manager
        </button>
      </div>
      {loading ? (
       <ManagerListLoader/>
      ) : (
        <div className="w-full overflow-x-auto lg:overflow-visible">
          <div className="min-w-[768px] flex flex-col gap-1 justify-start items-start">
            <div className="w-full grid grid-cols-5 text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">
                Manager Name
              </span>
              <span className="w-full flex justify-start items-center">
                Email
              </span>
              <JobType jobTitleDropdownOpen={jobTitleDropdownOpen} toggleJobTitleDropdown={toggleJobTitleDropdown}
            jobType={jobType} setJobType={setJobType}/>
            <LocationType locationDropdownOpen={locationDropdownOpen} toggleLocationDropdown={toggleLocationDropdown} 
            locationType={locationType} setLocationType={setLocationType}/>
              <span className="w-full flex justify-start items-center px-[170px]">
                Action
              </span>
            </div>

            {filteredData?.map((manager, index) => (
              <div onClick={() => handleEditClick(manager)} className="w-full h-8 grid grid-cols-5 border-b cursor-pointer
               border-white/10  text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
                <span
                  key={index}
                  className="w-full flex justify-start items-center"
                >
                  {manager?.name}
                </span>
                <span className="w-full flex justify-start items-center">
                  {manager?.email}
                </span>
                <span className="w-full flex justify-start items-center">
                  {manager?.jobtitle ?? "---"}
                </span>
                <span className="w-full flex justify-start items-center">
                  {manager?.location ?? "---"}
                </span>
                <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2 px-[170px]">
                  <span
                    className="flex justify-start items-center"
                    onClick={() => handleEditClick(manager)}
                  >
                    <FaRegEdit />
                  </span>
                  <span
                    className="flex justify-start items-center"
                    onClick={(e)=>{e.stopPropagation(); handleDeleteClick(manager?._id)}}
                  >
                    <RiDeleteBinLine />
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
      
            {/* DeleteAccount Modal */}
            <DeleteAccount
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onDeactivate={handleDeactivate}
              onDelete={()=>handleDelete()}
              deactivateLoading={deactivateLoading}
            />
            <DeactivateAccountModal
              isOpen={isDeactivateModalOpen}
              setIsOpen={setIsDeactivateModalOpen}
            />

            <DeleteManagerAccountModal
            managerId={managerId}
              isOpen={isAccountDeleteModalOpen}
              onClose={() => setIsAccountDeleteModalOpen(false)}
            />
    </div>
  );
};

export default ManagerTableBig;
