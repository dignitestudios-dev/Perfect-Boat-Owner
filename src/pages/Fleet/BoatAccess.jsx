import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  Fragment,
} from "react";
import { FiSearch } from "react-icons/fi";
import { GlobalContext } from "../../contexts/GlobalContext";
import BoatAccessModal from "./BoatAccessModal"; // Import the modal component
import BoatsLoader from "../../components/fleet/BoatsLoader";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import BoatManagerModal from "../Managers/BoatManagerModal";
import BoatType from "../../components/global/headerDropdowns/BoatType";
import LocationType from "../../components/global/headerDropdowns/LocationType";
import Pagination from "../../components/global/pagination/Pagination";
import { useNavigate } from "react-router-dom";

const BoatAccess = () => {
  const { boats, getBoats, loadingBoats, setUpdateBoat } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boatId, setBoatId] = useState("");
  const [boatsData, setBoatsData] = useState([]);
  // const [passSelectedManager,SetPassSelectedManager] = useState(null)
  const [passSelectedManagers, SetPassSelectedManagers] = useState([]);
  const [isManagerSuccess, setIsManagerSuccess] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [isManagerDetailModalOpen, setIsManagerDetailModalOpen] =
    useState(false);

  const [boatTypeDropdownOpen, setBoatTypeDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState([]);
  const [boatType, setBoatType] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;

  const toggleBoatTypeDropdown = () => {
    setBoatTypeDropdownOpen(!boatTypeDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

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
    setAccessLoading(true);
    try {
      const obj = {
        managers: managers?.map((item) => item?.id),
      };
      let managerName = managers?.map((item) => item?.name);
      const response = await axios.put(`/owner/boat/${boatId}/access`, obj);
      if (response.status === 200) {
        // setIsManagerDetailModalOpen(false)
        SetPassSelectedManagers(null);
        setIsManagerSuccess(true);
        SuccessToast("Boat access changed");
        if (response?.data?.data?.boat) {
          navigate("/boat/assign-access-rights", {
            state: {
              boats: response?.data?.data?.boat,
              managerName: managerName,
            },
          });
        }
      }
    } catch (err) {
      console.log("🚀 ~ handleAssignEmployees ~ err:", err);
      SetPassSelectedManagers(null);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setAccessLoading(false);
    }
  };

  useEffect(() => {
    getBoats(boatType, locationType);
  }, []);
  // useEffect(()=>{
  //   if(passSelectedManagers){
  // handleAssignManager()
  //   }
  // },[passSelectedManagers])

  const filteredData = boats?.filter((item) => {
    const matchesSearch = search
      ? item?.boatType?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.make?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.model?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.location?.toLowerCase()?.includes(search?.toLowerCase())
      : true;
    const boatTypeMatch =
      boatType && boatType.length !== 0
        ? boatType?.includes(item?.boatType?.toLowerCase())
        : true;
    const locationTypeMatch =
      locationType && locationType.length !== 0
        ? locationType?.includes(item?.location?.toLowerCase())
        : true;
    return matchesSearch && locationTypeMatch && boatTypeMatch;
  });

  const totalPages = Math.ceil(filteredData?.length / pageSize);
  // Slice the data for the current page
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
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
              allBoats={boats?.map((item) => item.boatType)}
              setCurrentPage={setCurrentPage}
            />
            <span className="flex justify-start items-center">
              Boat Name/Hull Number
            </span>
            <span className="flex justify-start items-center">
              Year/Make/Size
            </span>
            <span className="flex justify-center items-center ">
              <LocationType
                setLocationDropdownOpen={setLocationDropdownOpen}
                locationDropdownOpen={locationDropdownOpen}
                toggleLocationDropdown={toggleLocationDropdown}
                locationType={locationType}
                setLocationType={setLocationType}
                setCurrentPage={setCurrentPage}
                locationTitles={boats?.map((item) => item.location)}
                title="Location / Customer Name"
              />
            </span>
            <span className="flex justify-start items-center"></span>
          </div>

          {/* Scrollable container for table rows */}
          <div className="w-full overflow-x-auto">
            {loadingBoats || accessLoading ? (
              <Fragment>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="w-full min-w-[600px]">
                    <BoatsLoader index={index} />
                  </div>
                ))}
              </Fragment>
            ) : (
              <div className="w-full min-w-[600px]">
                {paginatedData?.map((boat, index) => (
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
                    <span className="flex justify-start items-center">
                      {boat.location}
                    </span>
                    <button
                      onClick={(e) => handleAccessModal(e, boat?._id)}
                      className="ml-12 w-[100px] h-[30px] flex justify-center items-center bg-[#1A293D] text-[#199BD1] rounded-xl py-1"
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
      <div className="w-full flex justify-center pb-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={() => {}}
        />
      </div>
      {isModalOpen && (
        <BoatAccessModal
          boatId={boatId}
          setIsOpen={setIsModalOpen}
          isManagerDetailModalOpen={isManagerDetailModalOpen}
          setIsManagerDetailModalOpen={setIsManagerDetailModalOpen}
          setCheckedManagers={() => {}}
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
