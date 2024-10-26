import React, { useContext, useRef, useState, useEffect, Fragment } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import BoatsLoader from "./BoatsLoader";
import { MdDelete } from "react-icons/md";
import DeletedModal from "../global/DeletedModal";

const BoatsTable = ({data , loading}) => {
  const { navigate } = useContext(GlobalContext);
  const [boatTypeFilter, setBoatTypeFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const boatTypeRef = useRef(null);
  const locationRef = useRef(null);
  const [search, setSearch] = useState("");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("")

  // Function to close modal
  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
  };

  const filteredData = data.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const boatTypes = ["Type 1", "Type 2", "Type 3"];
  const locations = [
    "East California Dock",
    "West California Dock",
    "South California Dock",
  ];

  const toggleBoatTypeModal = () => {
    setBoatTypeFilter((prev) => !prev);
  };

  const toggleLocationModal = () => {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBoatDetails=(boat) => {
    console.log("🚀 ~ handleBoatDetails ~ boat:", boat)
    navigate(`/boats/${boat?._id}`, {state:{boat}})
  }
  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      {/* <DeletedModal isOpen={isDeleteModalOpen} _id={deleteId}
        onClose={() => setDeleteModalOpen(false)} refreshTasks={handleDeleteConfirm} /> */}
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        Boats List{" "}
        <span className="text-[12px] font-normal text-white/50 ">(723)</span>
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex w-1/2 lg:w-[295px] h-[32px] items-center rounded-[8px] bg-[#1A293D] relative">
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
          onClick={() => navigate("/add-fleet", "All Tasks")}
          className="h-[32px] w-[104px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1] text-white text-[11px] font-bold leading-[14.85px]"
        >
          <span className="text-[11px]">+</span>
          Add Boat
        </button>
      </div>

      <div className="w-full flex flex-col gap-1 justify-start items-start">
        <div className="w-full grid grid-cols-5 text-[11px] py-2 border-b border-[#fff]/[0.14] font-medium leading-[14.85px] text-white/50 justify-start items-start">
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
              {boatTypes.map((type, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-start gap-2"
                >
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </button>
          <span className="w-full flex justify-start items-center">Name</span>
          <span className="w-full flex justify-start items-center">
            Model/Make/Size
          </span>
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
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-start gap-2"
                >
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                    {location}
                  </span>
                </div>
              ))}
            </div>
          </button>
          {/* <span className="w-full flex justify-start items-center">
            Action
          </span> */}
        </div>
        {loading ? (
          <Fragment>
          {Array.from({ length: 5 }).map((_, index) => (
        <BoatsLoader index={index}/>
      ))}
        </Fragment>
        ):(
          <Fragment>
            {/* Example rows */}
        {filteredData?.map((boat, index) => (
          <div
            key={index}
            onClick={() => handleBoatDetails(boat)}
            className="w-full h-auto grid grid-cols-5 cursor-pointer border-b border-[#fff]/[0.14] py-3 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center"
          >
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
                  background: "linear-gradient(to right, transparent, #001229)",
                }}
              />
            </span>
            <span className="w-full flex justify-start items-center">
              {boat?.boatType}
            </span>
            <span className="w-full flex justify-start items-center">
              {boat?.name}
            </span>
            <span className="w-full flex justify-start items-center">
              {boat.model} / {boat.make} / {boat.size}
            </span>
            <span className="w-full flex justify-start items-center">
            {boat.location}
            </span>
            {/* <span>
            <button
            type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModalOpen(true);
                setDeleteId(boat?._id)
              }}
            >
              <MdDelete className="text-[#fff]/[0.5] text-lg" />
            </button>
            </span> */}
          </div>
        ))}
         </Fragment>
        )}


      </div>
    </div>
  );
};

export default BoatsTable;
