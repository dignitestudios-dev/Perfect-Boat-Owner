import React, { useState, useRef, useEffect, Fragment } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import axios from "../../axios";
import BoatsLoader from "../../components/fleet/BoatsLoader";
import MiniListLoader from "../../components/global/MiniListLoader";

const BoatAccessModal = ({ setIsOpen, isManagerDetailModalOpen, setIsManagerDetailModalOpen, boatId }) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const [loadingBoats, setLoadingBoats] = useState(false);
  const [boats, setBoats] = useState([]);
  
  const jobTitleRef = useRef(null);
  const locationRef = useRef(null);

  const filteredData = boats?.filter((item) =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const jobTitles = ["Manager", "Engineer", "Developer"];
  const locations = ["East California Dock", "West California Dock", "South California Dock"];

  const toggleJobTitleFilter = () => {
    setJobTitleFilter((prev) => !prev);
  };

  const toggleLocationFilter = () => {
    setLocationFilter((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (jobTitleRef.current && !jobTitleRef.current.contains(event.target)) {
      setJobTitleFilter(false);
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

  const getBoats = async () => {
    setLoadingBoats(true);
    try {
      const { data } = await axios.get(`/owner/boat/${boatId}`);
      setBoats(data?.data?.boatAccess);
    } catch (err) {
      console.log("🚀 ~ getBoats ~ err:", err)
    } finally {
      setLoadingBoats(false);
    }
  };

  useEffect(()=>{
    if(boatId){ getBoats()}
  },[boatId])

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-[999]">
        <div className="w-[90%] max-w-4xl h-[80%] max-h-[80%] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D] z-[1000]">
          <div className="bg-[#001229] text-white rounded-2xl shadow-lg w-full h-full p-4 overflow-hidden">
            <div className="flex flex-col mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Boats Access To Managers
                </h3>
                <button
                  onClick={() => setIsOpen(false)} // Close the modal when "✕" is clicked
                  className="text-lg font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center mb-4 justify-between">
                <div className="relative w-72 h-10">
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-full bg-[#2A394C] text-white px-10 rounded-md outline-none"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                </div>
                <button
                  onClick={() => {
                    setIsManagerDetailModalOpen(true); // Open the ManagerDetailModal
                    setIsOpen(false); // Close the BoatAccessModal
                  }}
                  className="bg-[#119bd1] text-white px-6 py-2 rounded-md"
                >
                  Change
                </button>
              </div>
            </div>
            <div className="relative h-full overflow-auto">
              <table className="min-w-full text-white border-collapse">
                <thead className="border-b border-[#2A394C]">
                  <tr>
                    <th className="px-4 py-2">Manager Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2 relative">
                      <button
                        onClick={toggleJobTitleFilter}
                        className="flex items-center gap-1"
                      >
                        Job Title
                        <FaCaretDown />
                      </button>
                      <div
                        ref={jobTitleRef}
                        className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                          jobTitleFilter ? "scale-100" : "scale-0"
                        } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
                      >
                        {jobTitles.map((title, index) => (
                          <div
                            key={index}
                            className="w-full flex justify-start items-start"
                          >
                            <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                              {title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </th>
                    <th className="px-4 py-2 relative">
                      <button
                        onClick={toggleLocationFilter}
                        className="flex items-center gap-1"
                      >
                        Location
                        <FaCaretDown />
                      </button>
                      <div
                        ref={locationRef}
                        className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                          locationFilter ? "scale-100" : "scale-0"
                        } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
                      >
                        {locations.map((location, index) => (
                          <div
                            key={index}
                            className="w-full flex justify-start items-start"
                          >
                            <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                              {location}
                            </span>
                          </div>
                        ))}
                      </div>
                    </th>
                  </tr>
                </thead>
                {loadingBoats ? (
                  <Fragment>
                    <MiniListLoader/>
                  </Fragment>
                ) : (
                  <tbody>
                    {filteredData?.map((manager, index) => (
                      <tr key={index} className="border-b border-[#2A394C]">
                        <td className="px-4 py-2">{manager?.name}</td>
                        <td className="px-4 py-2">{manager?.email}</td>
                        <td className="px-4 py-2">{manager?.jobtitle || "---"}</td>
                        <td className="px-4 py-2">{manager?.location || "---"}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsOpen(false)} // Close the modal when "Done" is clicked
                className="bg-[#119bd1] text-white px-6 py-2 rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoatAccessModal;
