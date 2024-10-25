import React, { useContext, useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import MiniListLoader from "../global/MiniListLoader";
import BoatType from "../global/headerDropdowns/BoatType";
import LocationType from "../global/headerDropdowns/LocationType";

const DashboardBoats = ({ data, loading }) => {
  
  const { navigate, formatTimestampToDate } = useContext(GlobalContext);
  const [boatTypeDropdownOpen, setBoatTypeDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleBoatTypeDropdown = () => {
    setBoatTypeDropdownOpen(!boatTypeDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const [search, setSearch] = useState("");

  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        Boats{" "}
        <span className="text-[12px] font-normal text-white/50 ">
          ({data?.length})
        </span>
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
          <span className="w-[32px] h-full flex items-center justify-center">
            <FiSearch className="text-white/50 text-lg" />
          </span>
          <input
          onChange={(e)=>setSearch(e.target.value)}
            type="text"
            placeholder="Search here"
            className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
          />
        </div>

        <button
          className="ml-4 w-[104px] h-[35px] flex items-center justify-center bg-[#199BD1] text-white rounded-[10px] hover:bg-[#147aab] transition"
          onClick={() => navigate("/add-fleet", "All Tasks")}
        >
          + Add Boat
        </button>
      </div>
      {loading?(
        <MiniListLoader/>
      ):(
        <>
        {data?.length > 0 ? (
        <div className="w-full flex flex-col gap-1 justify-start items-start">
          <div className="w-full grid grid-cols-4 text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start relative">
            <BoatType boatTypeDropdownOpen={boatTypeDropdownOpen} toggleBoatTypeDropdown={toggleBoatTypeDropdown}/> 
            <span className="w-full flex justify-start items-center">Name</span>
            <span className="w-full flex justify-start items-center">
              Model / Make / Size
            </span>
            <LocationType locationDropdownOpen={locationDropdownOpen} toggleLocationDropdown={toggleLocationDropdown}/>
          </div>
          {filteredData?.slice(0, 4)?.map((boat, key) => {
            return (
              <div className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center">
                <span className="w-full capitalize flex justify-start items-center">
                  {boat?.boatType}
                </span>
                <span className="w-full capitalize flex justify-start items-center">
                  {boat?.name}
                </span>
                <span className="w-full flex justify-start items-center">
                  {boat?.model}/{boat?.make}/{boat?.size}
                </span>
                <span className="w-full flex justify-start items-center ">
                  {boat?.location}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full cursor-pointer py-8 flex justify-center items-center text-[16px] font-normal leading-[21.6px] text-white">
          No boats on the horizon? Add boat to keep track of its maintenance!
        </div>
      )}
        </>
      )}

      <div className="w-full h-auto flex justify-center items-center">
        <Link
          to={"/boats"}
          className="text-[11px] font-bold text-[#199BD1] underline underline-offset-2"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default DashboardBoats;
