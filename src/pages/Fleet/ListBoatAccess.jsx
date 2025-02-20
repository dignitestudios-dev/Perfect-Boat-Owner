import React, { useContext, useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown, FaTimes } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import SelectBoatsModal from "./SelectBoatsModal";

const ListBoatAccess = ({ isOpen, setIsOpen }) => {
  const { navigate } = useContext(GlobalContext);
  const [boatTypeFilter, setBoatTypeFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBoats, setSelectedBoats] = useState([]);
  const boatTypeRef = useRef(null);
  const locationRef = useRef(null);
  const [isSelectBoatsModalOpen, setIsSelectBoatsModalOpen] = useState(false); // State for modal visibility

  const handleOpenSelectBoatsModal = () => {
    setIsSelectBoatsModalOpen(true);
  };

  const handleCloseSelectBoatsModal = () => {
    setIsSelectBoatsModalOpen(false);
  };

  const toggleBoatTypeModal = () => {
    setBoatTypeFilter((prev) => !prev);
  };

  const toggleLocationFilter = () => {
    setLocationFilter((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (boatTypeRef.current && !boatTypeRef.current.contains(event.target)) {
      setBoatTypeFilter(false);
    }
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setLocationFilter(false);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBoats([]);
    } else {
      setSelectedBoats(Array(5).fill(true));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBoat = (index) => {
    const updatedSelection = [...selectedBoats];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedBoats(updatedSelection);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000a0] z-50">
      <div className="w-[100%] h-[90%] lg:w-[953px] lg:h-[680px] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="relative w-full h-full bg-[#001229] rounded-2xl p-4 lg:p-6">
          <button
            onClick={() => setIsOpen(false)}
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
                type="text"
                placeholder="Search here"
                className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white/50 pl-2"
              />
            </div>
            <button
              onClick={handleOpenSelectBoatsModal}
              className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
            >
              Change
            </button>
          </div>
          <div className="w-full h-[80%] overflow-y-auto flex flex-col gap-1 justify-start items-start mt-4">
            <div className="w-full grid grid-cols-5 text-[13px] py-2 border-b border-[#fff]/[0.14] font-medium leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">
                Boat Image
              </span>
              <button
                onClick={toggleBoatTypeModal}
                className="w-auto flex flex-col gap-1 justify-start items-start relative"
              >
                <div className="w-auto flex gap-1 justify-start items-center">
                  <span>Boat Type</span>
                  <FaCaretDown />
                </div>
                <div
                  ref={boatTypeRef}
                  className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    boatTypeFilter ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-6 left-0`}
                >
                  <div className="w-full flex justify-start items-start">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      Type 1
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      Type 2
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      Type 3
                    </span>
                  </div>
                </div>
              </button>
              <span className="w-full flex justify-start items-center">
                Boat Name/Hull Number
              </span>
              <span className="w-full flex justify-start items-center">
                Year/Make/Size
              </span>
              <button
                onClick={toggleLocationFilter}
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
                  <div className="w-full flex justify-start items-start">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      Location 1
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      Location 2
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      Location 3
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {Array(5)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-auto grid grid-cols-5 cursor-pointer border-b border-[#fff]/[0.14] py-3 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                >
                  <div className="flex items-center">
                    <span className="w-[106px] h-[76px] flex justify-start items-center relative">
                      <img
                        src={AuthMockup}
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
                    Type goes here
                  </span>
                  <span className="w-full flex justify-start items-center">
                    Boat Name
                  </span>
                  <span className="w-full flex justify-start items-center">
                    2019 / Toyotta / Class A
                  </span>
                  <span className="w-full flex justify-start items-center">
                    East California Dock
                  </span>
                </div>
              ))}
            {isSelectBoatsModalOpen && (
              <SelectBoatsModal
                isOpen={isSelectBoatsModalOpen}
                setIsOpen={handleCloseSelectBoatsModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBoatAccess;
