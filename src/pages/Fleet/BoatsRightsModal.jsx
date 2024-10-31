import React, { useContext, useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown, FaTimes } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import LocationType from "../../components/global/headerDropdowns/LocationType";
import BoatType from "../../components/global/headerDropdowns/BoatType";

const BoatRightsModal = ({ isOpen, setIsOpen, boatList }) => {
  const { navigate } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectAll, setSelectAll] = useState(false);
  const [selectedBoats, setSelectedBoats] = useState([]);

  const [boatTypeDropdownOpen, setBoatTypeDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState("all")
  const [boatType, setBoatType] = useState("all")

  const toggleBoatTypeDropdown = () => {
    setBoatTypeDropdownOpen(!boatTypeDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const filteredData = boatList?.filter((item) => {
    const matchesSearch = searchTerm ? item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) : true;
    const jobTypeMatch = boatType && boatType !== "all" ? item?.boatType?.toLowerCase() === boatType?.toLowerCase() : true;
    const locationTypeMatch = locationType && locationType !== "all" ? item?.location?.toLowerCase() === locationType?.toLowerCase() : true;
    return matchesSearch && locationTypeMatch && jobTypeMatch;
  });

  
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000a0] z-50">
      <div className="w-[90%] max-w-4xl h-[80%] max-h-[80%] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="relative w-full max-w-4xl h-full bg-[#001229] rounded-lg overflow-auto p-4 lg:p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-lg"
          >
            ✕
          </button>
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
            Boats Access List{" "}
            <span className="text-[12px] font-normal text-white/50 ">(723)</span>
          </h3>

          <div className="w-full h-auto flex justify-between items-center mt-4">
            <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
            
              <span className="w-[32px] h-full flex items-center justify-center">
                <FiSearch className="text-white/50 text-lg" />
              </span>
              <input
                onChange={(e)=>setSearchTerm(e.target.value)} 
                type="text"
                placeholder="Search here"
                className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white/50 pl-2"
              />
            </div>
            {/* <button
                onClick={() => console.log('Search triggered')} // Implement search functionality here
                className="bg-[#119bd1] text-white px-6 py-2 rounded-md"
              >
                Done
              </button> */}
          </div>
          <div className="mt-2">
            {/* <label className="flex items-center text-white/50">
              <input
                type="checkbox"
                className="accent-[#199BD1] mr-2"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              Select All
            </label> */}
          </div>

          <div className="w-full flex flex-col gap-1 justify-start items-start mt-4">
            <div className="w-full grid grid-cols-5 text-[13px] py-2 border-b border-[#fff]/[0.14] font-medium leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">Boat Image</span>
            <BoatType boatTypeDropdownOpen={boatTypeDropdownOpen} toggleBoatTypeDropdown={toggleBoatTypeDropdown}
            boatType={boatType} setBoatType={setBoatType}/> 
              
              <span className="w-full flex justify-start items-center">Name</span>
              <span className="w-full flex justify-start items-center">Model/Make/Size</span>
            <LocationType locationDropdownOpen={locationDropdownOpen} toggleLocationDropdown={toggleLocationDropdown}
            locationType={locationType} setLocationType={setLocationType}/>
              
            </div>

            {filteredData?.map((boat, index) => (
              <div
                key={index}
                // onClick={() => navigate(`/boats/${boat?._id}`, "Boat")}
                className="w-full h-auto grid grid-cols-5  border-b border-[#fff]/[0.14] py-3 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
              >
                <div className="flex items-center">
                  {/* <input
                    type="checkbox"
                    className="accent-[#199BD1] mr-2"
                    checked={selectedBoats[index] || false}
                    onChange={() => handleSelectBoat(index)}
                  />*/}
                  <span className="w-[106px] h-[76px] flex justify-start items-center relative">
                  <img
                src={boat?.cover}
                alt="boat_image"
                style={{ width: '100%',  height: '100%', borderRadius: '8px',  objectFit: 'cover',  }}
              />
              <div
                style={{ content: '""', position: 'absolute', top: 0, right: 0,
                  bottom: 0,  left: '70%', background: 'linear-gradient(to right, transparent, #111111)',
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
                      {boat?.make}, {boat?.model}, {boat?.size}
                    </span>
                    <span className="w-full flex justify-start items-center ">
                      {boat?.location}
                    </span>
                    <span className="w-full flex justify-start items-center "></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatRightsModal;
