import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";

const ManagerDetailModal = ({ setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const jobTitleRef = useRef(null);
  const locationRef = useRef(null);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-4xl h-[80%] max-h-[80%] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="bg-[#001229] text-white rounded-2xl shadow-lg w-full h-full p-4 overflow-hidden">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Manager List</h3>
              <button
                onClick={() => setIsOpen(false)} // Close the modal when "✕" is clicked
                className="text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center mb-4 justify-between">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-72 h-10 bg-[#2A394C] text-white px-4 rounded-md outline-none"
              />
              <button
                onClick={() => console.log('Search triggered')} // Implement search functionality here
                className="bg-[#119bd1] text-white px-6 py-2 rounded-md"
              >
                Done
              </button>
            </div>
          </div>
          <div className="relative h-full overflow-auto">
            <table className="min-w-full text-white">
              <thead>
                <tr>
                  <th className="px-0 py-2"></th>
                  <th className="px-4 py-2">Employee Name</th>
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
                        <div key={index} className="w-full flex justify-start items-start gap-2">
                          {/* <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" /> */}
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
                        <div key={index} className="w-full flex justify-start items-start gap-2">
                          <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                          <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                            {location}
                          </span>
                        </div>
                      ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(20)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-0 py-2">
                      {/* <input type="checkbox" className="w-4 h-4 accent-[#199BD1]" /> */}
                    </td>
                    <td className="px-4 py-2">Mark Taylor</td>
                    <td className="px-4 py-2">markT@gmail.com</td>
                    <td className="px-4 py-2">Dock Manager</td>
                    <td className="px-4 py-2">East California Dock</td>
                  </tr>
                ))}
              </tbody>
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
  );
};

export default ManagerDetailModal;
