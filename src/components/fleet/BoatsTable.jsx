import React, {
  useContext,
  useState,
  Fragment,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FiSearch } from "react-icons/fi";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import BoatsLoader from "./BoatsLoader";

import BoatType from "../global/headerDropdowns/BoatType";
import LocationType from "../global/headerDropdowns/LocationType";

// const debounce = (func, delay) => {
//   let timeout;
//   return (...args) => {
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };

const BoatsTable = ({
  data,
  loading,
  boatType,
  locationType,
  setFindSearch,
  setLocationType,
  setBoatType,
}) => {
  const { navigate } = useContext(GlobalContext);
  const timeoutRef = useRef(null);

  const [boatTypeDropdownOpen, setBoatTypeDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleBoatTypeDropdown = () => {
    setBoatTypeDropdownOpen(!boatTypeDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const [search, setSearch] = useState("");

  // let rows = 15;

  // const filteredData = data?.filter((item) =>
  //   item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  // );

  const handleBoatDetails = (boat) => {
    navigate(`/boats/${boat?._id}`, { state: { boat } });
  };

  const handleSearch = (e) => {
    const search = e.target.value;

    setSearch(search);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    //* Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setFindSearch(search);
    }, 1000);
  };

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      {/* <DeletedModal isOpen={isDeleteModalOpen} _id={deleteId}
        onClose={() => setDeleteModalOpen(false)} refreshTasks={handleDeleteConfirm} /> */}
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        Boats List{" "}
        <span className="text-[12px] font-normal text-white/50 ">
          ({data?.length})
        </span>
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex w-1/2 lg:w-[295px] h-[32px] items-center rounded-[8px] bg-[#1A293D] relative">
          <span className="w-[32px] h-full flex items-center justify-center">
            <FiSearch className="text-white/50 text-lg" />
          </span>
          <input
            onChange={(e) => handleSearch(e)}
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
          <BoatType
            boatTypeDropdownOpen={boatTypeDropdownOpen}
            toggleBoatTypeDropdown={toggleBoatTypeDropdown}
            boatType={boatType}
            setBoatType={setBoatType}
          />
          <span className="w-full flex justify-start items-center">Name</span>
          <span className="w-full flex justify-start items-center">
            Year/Make/Size
          </span>
          <LocationType
            locationDropdownOpen={locationDropdownOpen}
            toggleLocationDropdown={toggleLocationDropdown}
            locationType={locationType}
            setLocationType={setLocationType}
          />
          {/* <span className="w-full flex justify-start items-center">
            Action
          </span> */}
        </div>
        {loading ? (
          <Fragment>
            {Array.from({ length: 5 }).map((_, index) => (
              <BoatsLoader index={index} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {/* Example rows */}
            {data?.length > 0 ? (
              <>
                {data?.map((boat, index) => (
                  <div
                    key={index}
                    onClick={() => handleBoatDetails(boat)}
                    className="w-full h-auto grid grid-cols-5 cursor-pointer border-b border-[#fff]/[0.14] py-3 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center"
                  >
                    <span className="w-[106px] h-[76px] flex justify-start items-center relative">
                      <img
                        src={boat?.cover || AuthMockup}
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
              </>
            ) : (
              <div className="pt-4">No Record Found</div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default BoatsTable;
