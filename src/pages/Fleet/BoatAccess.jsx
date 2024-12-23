import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  Fragment,
} from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import BoatAccessModal from "./BoatAccessModal"; // Import the modal component
import SelectAllManager from "../Managers/SelectAllManager";
import BoatsLoader from "../../components/fleet/BoatsLoader";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import BoatManagerModal from "../Managers/BoatManagerModal";
import BoatType from "../../components/global/headerDropdowns/BoatType";
import LocationType from "../../components/global/headerDropdowns/LocationType";

const BoatAccess = () => {
  const { navigate, boats, getBoats, loadingBoats } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boatId, setBoatId] = useState("");
  const [boatsData, setBoatsData] = useState([]);
  // const [passSelectedManager,SetPassSelectedManager] = useState(null)
  const [passSelectedManagers, SetPassSelectedManagers] = useState([]);
  const [isManagerSuccess, setIsManagerSuccess] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [isManagerDetailModalOpen, setIsManagerDetailModalOpen] =
    useState(false);

  const [boatTypeDropdownOpen, setBoatTypeDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState("all");
  const [boatType, setBoatType] = useState("all");

  const toggleBoatTypeDropdown = () => {
    setBoatTypeDropdownOpen(!boatTypeDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const filteredData = boats?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const handleAccessModal = async (e, id) => {
    setBoatId(id);
    e.stopPropagation();
    setIsModalOpen(true);
    getBoatsById(id);
  };

  const getBoatsById = async (id) => {
    try {
      const { data } = await axios.get(`/owner/boat/${id}`);
      setBoatsData(data?.data?.boatAccess);
    } catch (err) {
      console.log("getBoatsById ~ err:", err);
    }
  };

  const handleAssignManager = async (managers) => {
    try {
      const obj = {
        managers: managers?.map((item) => item?.id),
      };
      const response = await axios.put(`/owner/boat/${boatId}/access`, obj);
      if (response.status === 200) {
        // setIsManagerDetailModalOpen(false)
        SetPassSelectedManagers(null);
        setIsManagerSuccess(true);
        SuccessToast("Boat access assigned");
      }
    } catch (err) {
      console.log("🚀 ~ handleAssignEmployees ~ err:", err);
      SetPassSelectedManagers(null);
      ErrorToast(err?.response?.data?.message);
    } finally {
    }
  };

  useEffect(() => {
    getBoats(boatType, locationType);
  }, [boatType, locationType]);
  // useEffect(()=>{
  //   if(passSelectedManagers){
  // handleAssignManager()
  //   }
  // },[passSelectedManagers])

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
          Boats Access{" "}
          <span className="text-[12px] font-normal text-white/50 ">
            ({boats?.length})
          </span>
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
              className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white/50 pl-2"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 justify-start items-start">
          <div className="w-full grid grid-cols-6 text-[11px] py-2 border-b border-[#fff]/[0.14] font-medium leading-[14.85px] text-white/50 justify-start items-start">
            <span className="flex justify-start items-center">Boat Image</span>
            <BoatType
              boatTypeDropdownOpen={boatTypeDropdownOpen}
              setBoatTypeDropdownOpen={setBoatTypeDropdownOpen}
              toggleBoatTypeDropdown={toggleBoatTypeDropdown}
              boatType={boatType}
              setBoatType={setBoatType}
            />
            <span className="flex justify-start items-center">Name</span>
            <span className="flex justify-start items-center">
              Year/Make/Size
            </span>
            <span className="flex justify-center items-center ml-16">
              <LocationType
                setLocationDropdownOpen={setLocationDropdownOpen}
                locationDropdownOpen={locationDropdownOpen}
                toggleLocationDropdown={toggleLocationDropdown}
                locationType={locationType}
                setLocationType={setLocationType}
              />
            </span>
            <span className="flex justify-start items-center"></span>
          </div>

          {/* Scrollable container for table rows */}
          <div className="w-full overflow-x-auto">
            {loadingBoats ? (
              <Fragment>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="w-full min-w-[600px]">
                    <BoatsLoader index={index} />
                  </div>
                ))}
              </Fragment>
            ) : (
              <div className="w-full min-w-[600px]">
                {filteredData?.map((boat, index) => (
                  <div
                    key={index}
                    // onClick={() => navigate("/boats/1", "Boat")}
                    className="w-full h-auto grid grid-cols-6 cursor-pointer border-b border-[#fff]/[0.14] py-3 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center"
                  >
                    <span className="w-[106px] h-[76px] flex justify-start items-center relative">
                      <img
                        src={boat?.cover}
                        alt="boat_image"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "15px 0 0 15px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        className="w-24"
                        style={{
                          content: '""',
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(to right, transparent, #001229)",
                        }}
                      />
                    </span>
                    <span className="flex justify-start items-center">
                      {boat?.boatType}
                    </span>
                    <span className="flex justify-start items-center">
                      {boat?.name}
                    </span>
                    <span className="flex justify-start items-center">
                      {boat.model} / {boat.make} / {boat.size}
                    </span>
                    <span className="flex justify-center items-center">
                      {boat.location}
                    </span>
                    <button
                      onClick={(e) => handleAccessModal(e, boat?._id)}
                      className="w-[100px] h-[30px] flex justify-center items-center bg-[#1A293D] text-[#199BD1] rounded-xl py-1"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <BoatAccessModal
          boatId={boatId}
          setIsOpen={setIsModalOpen}
          isManagerDetailModalOpen={isManagerDetailModalOpen}
          setIsManagerDetailModalOpen={setIsManagerDetailModalOpen}
        />
      )}{" "}
      {isManagerDetailModalOpen && (
        <ManagerDetailModal
          setIsOpen={setIsManagerDetailModalOpen}
          handleManagerModal={(managers) => handleAssignManager(managers)}
          // boatAccess={boatsData?.boatAccess}
          // SetPassSelectedManager={SetPassSelectedManager}
          SetPassSelectedManagers={SetPassSelectedManagers}
          isMultiple={true}
          boatAccess={boatsData}
          selectedManagers={selectedManagers}
          setSelectedManagers={setSelectedManagers}
        />
        // <SelectAllManager setIsOpen={setIsManagerDetailModalOpen} />
      )}
      {isManagerSuccess && <BoatManagerModal setIsOpen={setIsManagerSuccess} />}
      {/* Conditionally render modal */}
    </div>
  );
};

export default BoatAccess;
