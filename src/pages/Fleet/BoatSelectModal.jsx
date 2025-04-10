import React, { useContext, useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown, FaTimes } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import BoatType from "../../components/global/headerDropdowns/BoatType";
import LocationType from "../../components/global/headerDropdowns/LocationType";
import { ErrorToast } from "../../components/global/Toaster";

const BoatSelectModal = ({
  isOpen,
  setIsOpen,
  SetPassSelectedBoat,
  passSelectedBoat,
  isMultiple = false,
  setInputError,
}) => {
  const { navigate, boats, loadingBoats } = useContext(GlobalContext);
  const [allSelected, setAllSelected] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [selectedBoats, setSelectedBoats] = useState([]);
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

  const [search, setSearch] = useState("");

  const filteredData = boats?.filter((item) => {
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

  const handleSelectAll = () => {
    setInputError({});
    if (allSelected) {
      // Deselect all employee
      setSelectedBoats([]);
    } else {
      // Select all employee
      setSelectedBoats(
        filteredData?.map((data) => ({
          id: data?._id,
          name: data?.name,
          type: data?.boatType,
          make: data?.make,
          location: data?.location,
        }))
      );
    }
    setAllSelected(!allSelected);
  };

  const handleSelectBoat = (boatId, boatName, boatType, make, location) => {
    setInputError({});
    if (isMultiple) {
      const isSelected = selectedBoats.some((boat) => boat?.id === boatId);
      if (isSelected) {
        setSelectedBoats(selectedBoats.filter((boat) => boat?.id !== boatId));
      } else {
        setSelectedBoats([
          ...selectedBoats,
          { id: boatId, name: boatName, type: boatType, make: make, location },
        ]);
      }
    } else {
      if (selectedBoat?.id === boatId) {
        setSelectedBoat(null);
      } else {
        setSelectedBoat({ id: boatId, name: boatName });
      }
    }
  };

  const handleBoatSelection = () => {
    if (isMultiple) {
      SetPassSelectedBoat(selectedBoats);
      setIsOpen(false);
    } else {
      if (selectedBoat) {
        SetPassSelectedBoat(selectedBoat);
        setIsOpen(false);
      } else {
        ErrorToast("Select Boat");
      }
    }
  };

  useEffect(() => {
    if (isMultiple) {
      setSelectedBoats(passSelectedBoat);
    }
  }, [passSelectedBoat]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000a0] z-50">
      <div className="w-[100%]  h-[90%] lg:w-[953px] lg:h-[680px] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="relative w-full  h-full bg-[#001229] rounded-2xl  p-4 lg:p-6">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-lg"
          >
            ✕
          </button>
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
            Boats List{" "}
            <span className="text-[12px] font-normal text-white/50 ">
              ({filteredData?.length})
            </span>
          </h3>

          <div className="w-full h-auto flex justify-between items-center mt-4">
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
            <button
              type="button"
              onClick={() => handleBoatSelection()}
              className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
            >
              Done
            </button>
          </div>
          <div className="mt-4 mb-2">
            {isMultiple && (
              <label className="flex items-center text-white/50">
                <input
                  type="checkbox"
                  className="w-5 h-5 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                                 checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500] mr-2
                                checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229] checked:after:text-md checked:after:p-1"
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
                Select All
              </label>
            )}
          </div>

          <div className="w-full h-[80%] overflow-y-auto flex flex-col gap-1 justify-start items-start mt-4">
            <div className="w-full grid grid-cols-5 text-[13px] py-2 border-b border-[#fff]/[0.14] font-medium leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">
                Boat Image
              </span>
              <BoatType
                setBoatTypeDropdownOpen={setBoatTypeDropdownOpen}
                boatTypeDropdownOpen={boatTypeDropdownOpen}
                toggleBoatTypeDropdown={toggleBoatTypeDropdown}
                boatType={boatType}
                setBoatType={setBoatType}
                allBoats={boats?.map((item) => item.boatType)}
              />
              <span className="w-full flex justify-start items-center">
                Boat Name/Hull Number
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
                setCurrentPage={() => {}}
                locationTitles={boats?.map((item) => item.location)}
                title="Location / Customer Name"
              />
            </div>
            {filteredData?.length > 0 ? (
              <>
                {filteredData?.map((boat, index) => {
                  const isSelected = selectedBoat?.id === boat._id;
                  const isMultiSelected = selectedBoats.some(
                    (selected) => selected.id === boat._id
                  );

                  return (
                    <div
                      key={index}
                      className="w-full h-auto grid grid-cols-5 border-b border-[#fff]/[0.14] py-3 text-[13px] font-medium 
                  leading-[14.85px] text-white justify-start items-center"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                                 checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500] mr-2
                                checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229] checked:after:text-md checked:after:p-1"
                          checked={isMultiple ? isMultiSelected : isSelected}
                          onChange={() =>
                            handleSelectBoat(
                              boat?._id,
                              boat?.name,
                              boat?.boatType,
                              `${boat?.make}, ${boat?.model}, ${boat?.size}`,
                              boat?.location
                            )
                          }
                        />
                        <span className="w-[106px] h-[76px] flex justify-start items-center relative ml-1">
                          <img
                            src={boat?.cover}
                            alt="boat_image"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "15px 0 0 15px",
                              objectFit: "cover",
                            }}
                            className="bg-gray-600"
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
              <div className="pt-2">No record found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatSelectModal;
