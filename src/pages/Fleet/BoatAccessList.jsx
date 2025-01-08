import React, { useContext, useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown, FaTimes } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import RequestTaskListLoader from "../../components/tasks/loaders/RequestTaskListLoader";
import axios from "../../axios";
import BoatManagerAccessModal from "./BoatManagerAccessModal";
import { FiLoader } from "react-icons/fi";
import { ErrorToast } from "../../components/global/Toaster";
import BoatType from "../../components/global/headerDropdowns/BoatType";
import LocationType from "../../components/global/headerDropdowns/LocationType";

const BoatAccessList = ({ isOpen, setIsOpen, managerId, managerName }) => {
  const { navigate, boats, setUpdateBoat, setUpdateManager } =
    useContext(GlobalContext);
  const [allSelected, setAllSelected] = useState(false);
  const [selectedBoats, setSelectedBoats] = useState([]);

  const [search, setSearch] = useState("");

  const [isSelectBoatsModalOpen, setIsSelectBoatsModalOpen] = useState(false);
  const [loadingManager, setLoadingManager] = useState(false);
  const [managersBoat, setManagersBoat] = useState([]);

  const [assignLoading, setAssignLoading] = useState(false);
  const [isBoatManagerAccessOpen, setIsBoatManagerAccessOpen] = useState(false);
  const [boatTypeDropdownOpen, setBoatTypeDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState([]);
  const [boatType, setBoatType] = useState([]);

  const toggleBoatTypeDropdown = () => {
    setBoatTypeDropdownOpen(!boatTypeDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  // const filteredData = managersBoat?.filter((item) =>
  //   item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  // );

  const filteredData = managersBoat?.filter((item) => {
    const matchesSearch = search
      ? item?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.boatType?.toLowerCase()?.includes(search?.toLowerCase()) ||
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

  const filteredBoats = boats?.filter((item) => {
    const matchesSearch = search
      ? item?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.boatType?.toLowerCase()?.includes(search?.toLowerCase()) ||
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

  const handleOpenSelectBoatsModal = () => {
    setIsSelectBoatsModalOpen(true);
  };

  // const handleCloseSelectBoatsModal = () => {
  //   setIsSelectBoatsModalOpen(false);
  // };

  const handleClose = () => {
    setIsBoatManagerAccessOpen(false);
    setIsSelectBoatsModalOpen(false);
    setIsOpen(false);
  };

  // const handleSelectAll = () => {
  //   if (selectAll) {
  //     setSelectedBoats([]);
  //   } else {
  //     setSelectedBoats(Array(5).fill(true));
  //   }
  //   setSelectAll(!selectAll);
  // };

  const handleSelectBoat = (boats) => {
    const isSelected = selectedBoats.some((boat) => boat?._id === boats._id);
    if (isSelected) {
      setSelectedBoats(selectedBoats.filter((boat) => boat?._id !== boats._id));
    } else {
      setSelectedBoats([...selectedBoats, boats]);
    }
  };

  const getManagerById = async () => {
    setLoadingManager(true);
    try {
      const { data } = await axios.get(`/owner/manager/${managerId}/boat`);
      setManagersBoat(data?.data);
      setSelectedBoats(data?.data);
    } catch (err) {
      console.log("🚀 ~ getManagerById ~ err:", err);
    } finally {
      setLoadingManager(false);
    }
  };

  const handleAssignBoats = async () => {
    setAssignLoading(true);
    try {
      const obj = {
        boats: selectedBoats?.map((item) => item._id),
      };
      const response = await axios.put(`/owner/manager/${managerId}/boat`, obj);
      if (response.status === 200) {
        setIsBoatManagerAccessOpen(true);
        setIsSelectBoatsModalOpen(false);
        setUpdateBoat((prev) => !prev);
        setUpdateManager((prev) => !prev);
        getManagerById();
      }
    } catch (err) {
      console.log("🚀 ~ handleAssignEmployees ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setAssignLoading(false);
    }
  };

  useEffect(() => {
    if (managerId) {
      getManagerById();
    }
  }, [managerId]);

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all employee
      setSelectedBoats([]);
    } else {
      // Select all employee
      setSelectedBoats(filteredBoats?.map((employee) => employee));
    }
    setAllSelected(!allSelected);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000a0] z-50">
      <div className="w-[100%] h-[90%] lg:w-[953px] lg:h-[680px] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="relative w-full h-full bg-[#001229] rounded-2xl p-4 lg:p-6">
          <button
            onClick={() => {
              setIsOpen(false);
              setIsSelectBoatsModalOpen(false);
            }}
            className="absolute top-4 right-4 text-white text-lg"
          >
            ✕
          </button>
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
            Boats Access List{" "}
          </h3>

          <div className="w-full h-auto flex justify-between items-center mt-4">
            <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
              <span className="w-[32px] h-full flex items-center justify-center">
                <FiSearch className="text-white/50 text-lg" />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search here"
                className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white/50 pl-2"
              />
            </div>
            {isSelectBoatsModalOpen ? (
              <button
                disabled={assignLoading}
                onClick={handleAssignBoats}
                className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
              >
                <div className="flex items-center">
                  <span className="mr-1">Done</span>
                  {assignLoading && (
                    <FiLoader className="animate-spin text-lg mx-auto" />
                  )}
                </div>
              </button>
            ) : (
              <button
                onClick={handleOpenSelectBoatsModal}
                className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
              >
                Change
              </button>
            )}
          </div>
          {isSelectBoatsModalOpen && (
            <div className="mt-4 mb-2">
              <label className="flex items-center text-white/50">
                <input
                  type="checkbox"
                  className="w-5 h-5 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                    mr-1.5 checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500]
                                checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229]
                                 checked:after:text-[15px] checked:after:p-[2px] "
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
                Select All
              </label>
            </div>
          )}

          <div className="w-full h-[80%] overflow-y-auto flex flex-col gap-1 justify-start items-start mt-4">
            <div className="w-full grid grid-cols-5 text-[13px] py-2 border-b border-[#fff]/[0.14] font-medium leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">
                Boat Image
              </span>
              <BoatType
                setBoatTypeDropdownOpen={setBoatTypeDropdownOpen}
                boatTypeDropdownOpen={boatTypeDropdownOpen}
                toggleBoatTypeDropdown={toggleBoatTypeDropdown}
                setBoatType={setBoatType}
                boatType={boatType}
              />

              <span className="w-full flex justify-start items-center">
                Name
              </span>
              <span className="w-full flex justify-start items-center">
                Year/Make/Size
              </span>
              <LocationType
                setLocationDropdownOpen={setLocationDropdownOpen}
                locationDropdownOpen={locationDropdownOpen}
                toggleLocationDropdown={toggleLocationDropdown}
                locationType={locationType}
                setLocationType={setLocationType}
              />
            </div>

            {loadingManager ? (
              <RequestTaskListLoader />
            ) : (
              <>
                {isSelectBoatsModalOpen ? (
                  <>
                    {filteredBoats?.map((boat, index) => {
                      const isMultiSelected = selectedBoats.some(
                        (selected) => selected._id === boat._id
                      );
                      return (
                        <div
                          key={index}
                          className="w-full h-auto grid grid-cols-5 border-b border-[#fff]/[0.14] py-3 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                              mr-1.5 checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500]
                                          checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229]
                                           checked:after:text-[14px] "
                              checked={isMultiSelected}
                              onChange={() => handleSelectBoat(boat)}
                            />
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
                          </div>
                          <span className="w-full flex justify-start items-center">
                            {boat?.boatType}
                          </span>
                          <span className="w-full flex justify-start items-center">
                            {boat?.name}
                          </span>
                          <span className="w-full flex justify-start items-center">
                            {boat?.model} / {boat?.make} / {boat?.size}
                          </span>
                          <span className="w-full flex justify-start items-center">
                            {boat?.location}
                          </span>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {filteredData?.map((boat, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full h-auto grid grid-cols-5 border-b border-[#fff]/[0.14] py-3 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                        >
                          <div className="flex items-center">
                            <span className="w-[106px] h-[76px] flex justify-start items-center relative">
                              <img
                                src={boat?.boatImage}
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
                          </div>
                          <span className="w-full flex justify-start items-center">
                            {boat?.boatType}
                          </span>
                          <span className="w-full flex justify-start items-center">
                            {boat?.name}
                          </span>
                          <span className="w-full flex justify-start items-center">
                            {boat?.model} / {boat?.make} / {boat?.size}
                          </span>
                          <span className="w-full flex justify-start items-center">
                            {boat?.location}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}

            <BoatManagerAccessModal
              handleClose={() => handleClose()}
              manager={managerName}
              isOpen={isBoatManagerAccessOpen}
              setIsOpen={setIsBoatManagerAccessOpen}
            />

            {/* {isSelectBoatsModalOpen && (
              <SelectBoatsModal isOpen={isSelectBoatsModalOpen} setIsOpen={handleCloseSelectBoatsModal}/>
              <BoatSelectModal
              SetPassSelectedBoat={SetPassSelectedBoat} isMultiple={true}
                isOpen={isSelectBoatsModalOpen}
                setIsOpen={handleCloseSelectBoatsModal}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatAccessList;
