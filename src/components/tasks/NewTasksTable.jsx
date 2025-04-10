import React, { useContext, useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import axios from "../../axios";
import { ErrorToast } from "../global/Toaster";
import RequestTaskListLoader from "./loaders/RequestTaskListLoader";
import LocationType from "../global/headerDropdowns/LocationType";
import { useNavigate } from "react-router-dom";
import { getUnixDate } from "../../data/DateFormat";
import moment from "moment";

const NewTaskTable = () => {
  const navigate = useNavigate();
  // const [locationFilter, setLocationFilter] = useState(false);
  // const locationRef = useRef(null);
  const [locationType, setLocationType] = useState([]);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  // const handleClickOutside = (event) => {
  //   if (locationRef.current && !locationRef.current.contains(event.target)) {
  //     setLocationFilter(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = data?.filter((item) =>
    item?.boat?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  // Fetch tasks from the API
  const getData = async (locationType = []) => {
    setLoading(true);
    try {
      const locationQuery =
        locationType.length !== 0 ? `?location=${locationType}` : "";
      const { data } = await axios.get(`/owner/task/requests${locationQuery}`);
      setData(data?.data || []);
    } catch (err) {
      console.error("Error fetching Task data:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(locationType);
  }, [locationType]);

  return (
    <div className="w-full h-auto flex flex-col gap-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        New Task Request List{" "}
        <span className="text-[12px] font-normal text-white/50 ">
          ({data.length})
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
        <div
          className="w-full grid grid-cols-5 text-[11px] py-2 border-b border-[#fff]/[0.14] 
        font-medium leading-[14.85px] text-white/50 justify-start items-start"
        >
          <span className="w-full flex justify-start items-center">
            Boat Image
          </span>
          <span className="w-full flex justify-start items-center">
            Boat Name
          </span>
          <LocationType
            setLocationDropdownOpen={setLocationDropdownOpen}
            locationDropdownOpen={locationDropdownOpen}
            toggleLocationDropdown={toggleLocationDropdown}
            locationType={locationType}
            setLocationType={setLocationType}
            setCurrentPage={() => {}}
            locationTitles={data?.map((item) => item.location)}
            title="Location / Customer Name"
          />
          <span className="w-full flex justify-start items-center px-[60px]">
            Requested By
          </span>
          <span className="w-full flex justify-start items-center px-[60px]">
            Reported Date
          </span>
        </div>

        {loading ? (
          <RequestTaskListLoader />
        ) : (
          <>
            {filteredData?.length > 0 ? (
              filteredData?.map((task, key) => {
                return (
                  <button
                    key={key}
                    onClick={() =>
                      navigate(`/new-tasks-request/${task?._id}`, {
                        state: { task },
                      })
                    }
                    className="w-full h-auto grid grid-cols-5 border-b border-[#fff]/[0.14] py-3 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center"
                  >
                    <span className="w-[106px] h-[76px] flex justify-start items-center relative">
                      <img
                        src={task?.boat?.cover}
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
                      {task?.boat?.name}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {task?.boat?.location}
                    </span>
                    <span className="w-full flex justify-start items-center px-[60px]">
                      {task?.employee?.name}
                    </span>
                    <span className="w-full flex justify-start items-center px-[60px]">
                      {moment(task?.createdAt).format("MM-DD-YYYY")}
                    </span>
                  </button>
                );
              })
            ) : (
              <span className="w-full">No Record Found</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewTaskTable;
