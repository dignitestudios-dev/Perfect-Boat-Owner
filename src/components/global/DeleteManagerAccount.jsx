import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AccountDeletedModal from "./AccountDeletedModal";
import ManagerDetailModal from "../../pages/Managers/ManagerDetailModal"
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { ErrorToast } from "./Toaster";
import { GlobalContext } from "../../contexts/GlobalContext";

const DeleteManagerAccount = () => {
  const {id} = useParams()
    const location = useLocation();
    const  {reasonForDelete}= location.state || {};
    const {setUpdateManager} = useContext(GlobalContext)

    const [locationFilter, setLocationFilter] = useState(false);
    const [jobFilter, setJobFilter] = useState(false);
    const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
    const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] = useState(false);
    const [isAccountDeletedModalOpen, setIsAccountDeletedModalOpen] = useState(false);
    const [passSelectedManager, SetPassSelectedManager] = useState("");
    const [selectedManager, setSelectedManager] = useState("")
    
    const [loading, setLoading] = useState(false)
    const [deleteLoad,setDeleteLoad] = useState(false)
    const [userData, setUserData] = useState("")
    console.log("🚀 ~ DeleteManagerAccount ~ userData:", userData)

    const navigate = useNavigate();

    const locationRef = useRef(null);
    const jobRef = useRef(null);

    const handleViewProfile = () => {
        navigate(`/edit-manager/${id}`);
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

    const handleDelete = async () => {
        setDeleteLoad(true)
    try {
      const employeeData = {
        employees: userData?.employees?.map((employee)=>employee?._id)
      }

      const putResponse = await axios.put(`/owner/manager/${passSelectedManager?.id}/employees/assign`, employeeData);
      if (putResponse?.status === 200) {
        const obj = {
          reason: reasonForDelete,
        };
        const deleteResponse = await axios.delete(`/owner/manager/${id}`, { data: obj });

    if (deleteResponse?.status === 200) {
      setIsAccountDeletedModalOpen(true);
      setUpdateManager((prev)=>!prev)
    } 
  }
        
    } catch (error) {
      console.error("Error deleting task:", error);
      ErrorToast(error?.response?.data?.message)
    }
    finally{
      setDeleteLoad(false)
    } };

    const getDataById = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/owner/manager/${id}`)
          if(response?.status === 200){
            setUserData(response?.data?.data)
          }
        }
        catch(err){
          console.log(err)
        }
        finally{
          setLoading(false)
        }
      }
      
      useEffect(()=>{
        getDataById()
      },[])

    return (
      <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          {loading ? (
            <div className="w-full h-[90dvh] flex justify-center items-center">
              <FiLoader className="text-[30px] animate-spin text-lg mx-auto" />
            </div>
          ) : (
            <>
              <div className="flex w-full items-center justify-between">
                <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                  Delete Account
                </h3>
                <button
                  onClick={handleViewProfile}
                  className="w-full lg:w-[135px] h-[35px] flex items-center gap-1 rounded-[10px] justify-center
                         bg-[#1A293D] text-[#199BD1] text-[11px] font-bold leading-[14.85px]"
                >
                  View Profile
                </button>
              </div>
              <p className="text-[16px]">
                Before deleting the account of {userData?.managers?.name},
                please reassign the following employees that are currently
                assigned to this manager to another manager.
              </p>
              <div className="w-full max-w-[500px] flex flex-col gap-2 sm:gap-4 lg:gap-6">
                <label className="text-[16px] font-medium leading-[21.6px] text-white">
                  Select Manager
                </label>
                <button
                  onClick={() => setIsBoatModalOpen(true)}
                  className="w-full h-[52px] bg-[#1A293D] disabled:text-50 outline-none px-3 focus:border-[1px]
                         focus:border-[#55C9FA] rounded-xl"
                >
                  {passSelectedManager?.name || "Click Here To Select Manager"}
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
                  {userData?.employees?.length > 0 ? (
                    <>
                      {userData?.employees?.map((employee, index) => (
                        <div
                          key={index}
                          className="w-full h-10 grid grid-cols-10 border-b border-[#fff]/[0.14] text-[11px] font-medium leading-[14.85px] text-white"
                        >
                          <span className="col-span-2 flex items-center px-2">
                            {employee?.name}
                          </span>
                          <span className="col-span-3 flex items-center px-2">
                            {employee?.email}
                          </span>
                          <span className="col-span-2 flex items-center px-2">
                            {employee?.jobtitle}
                          </span>
                          <span className="col-span-3 flex items-center px-2">
                            {employee?.location}
                          </span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="pt-2">
                      No employees are assigned to this manager.{" "}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
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
            disabled={deleteLoad}
            onClick={handleDelete} // Trigger delete action
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center
             justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Delete Account</span>
              {deleteLoad && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
        </div>

        {/* EmployeeDetailModal Component */}
        {isBoatModalOpen && (
        <ManagerDetailModal managerId={id} SetPassSelectedManager={SetPassSelectedManager}
         isMultiple= {false} setIsOpen={setIsBoatModalOpen} setSelectedManager={setSelectedManager} selectedManager={selectedManager} />
        )}

        {/* AssignManagerModal Component */}
        {/* {isAssignEmployeeModalOpen && (
          <AssignManagerModal
          managerId={id}
            isOpen={isAssignEmployeeModalOpen}
            onClose={() => setIsAssignEmployeeModalOpen(false)}
            SetPassSelectedManager={SetPassSelectedManager}
          />
        )} */}

        {/* AccountDeletedModal Component */}
        {isAccountDeletedModalOpen && (
          <AccountDeletedModal
          isManager={true}
            isOpen={isAccountDeletedModalOpen}
            setIsOpen={setIsAccountDeletedModalOpen}
          />
        )}
      </div>
    );
};

export default DeleteManagerAccount;
