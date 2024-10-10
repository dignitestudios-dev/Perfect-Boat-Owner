import React, { useContext, useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import axios from "../../axios";

const NewTaskTable = () => {
  const { navigate } = useContext(GlobalContext);
  const [locationFilter, setLocationFilter] = useState(false);
  const locationRef = useRef(null);

  const toggleLocationModal = () => {
    setLocationFilter((prev) => !prev);
  };

  const handleClickOutside = (event) => {
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const toggleModal = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setOpenDropdownFilter((prev) => !prev);
    }
  };

  // Fetch tasks from the API
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/owner/task/requests?search=${search}`);
      setData(data?.data || []);
    } catch (err) {
      console.error("Error fetching Task data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <div className="w-full h-auto flex flex-col gap-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        New Task Request List{" "}
        <span className="text-[12px] font-normal text-white/50 ">(723)</span>
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
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
      </div>

      <div className="w-full flex flex-col gap-1 justify-start items-start">
        <div className="w-full grid grid-cols-4 text-[11px] py-2 border-b border-[#fff]/[0.14] font-medium leading-[14.85px] text-white/50 justify-start items-start">
          <span className="w-full flex justify-start items-center">
            Boat Image
          </span>
          <span className="w-full flex justify-start items-center">
            Boat Name
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
              <div className="w-full flex justify-start items-start gap-2">
                <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                  East California Dock
                </span>
              </div>
              <div className="w-full flex justify-start items-start gap-2">
                <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                  West California Dock
                </span>
              </div>
              <div className="w-full flex justify-start items-start gap-2">
                <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                  South California Dock
                </span>
              </div>
            </div>
          </button>
          <span className="w-full flex justify-start items-center px-[60px]">
            Requested By
          </span>
        </div>

        {data?.map((task, key) => {
          return (
            <button
              onClick={() =>
                navigate(`/new-tasks-request/${task?._id}`, "New Task Request")
              }
              className="w-full h-auto grid grid-cols-4 border-b border-[#fff]/[0.14] py-3 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center"
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
                David Beckham
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NewTaskTable;
