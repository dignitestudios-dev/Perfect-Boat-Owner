import React, { useState, useRef, useEffect, Fragment } from "react";

import axios from "../../axios";
import MiniListLoader from "../../components/global/MiniListLoader";
import JobType from "../../components/global/headerDropdowns/JobType";
import LocationType from "../../components/global/headerDropdowns/LocationType";
import { FiSearch } from "react-icons/fi";

const BoatAccessModal = ({
  setIsOpen,
  setIsManagerDetailModalOpen,
  boatId,
  setCheckedManagers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [loadingBoats, setLoadingBoats] = useState(false);
  const [accessManagers, setAccessManagers] = useState([]);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const filteredData = accessManagers?.filter((item) => {
    const matchesSearch = searchTerm
      ? item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.jobtitle?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      : true;
    const jobTypeMatch =
      jobType && jobType.length !== 0
        ? jobType?.includes(item?.jobtitle?.toLowerCase())
        : true;
    const locationTypeMatch =
      locationType && locationType.length !== 0
        ? locationType?.includes(item?.location?.toLowerCase())
        : true;
    return matchesSearch && locationTypeMatch && jobTypeMatch;
  });

  const getBoats = async () => {
    setLoadingBoats(true);
    try {
      const { data } = await axios.get(`/owner/boat/${boatId}`);
      setAccessManagers(data?.data?.boatAccess);
      setCheckedManagers(data?.data?.boatAccess);
    } catch (err) {
      console.log("🚀 ~ getBoats ~ err:", err);
    } finally {
      setLoadingBoats(false);
    }
  };

  useEffect(() => {
    if (boatId) {
      getBoats();
    }
  }, [boatId]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
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
              <div className="w-[95%] h-auto flex justify-between items-center mt-4">
                <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
                  <span className="w-[32px] h-full flex items-center justify-center">
                    <FiSearch className="text-white/50 text-lg" />
                  </span>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search here"
                    className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white/50 pl-2"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsManagerDetailModalOpen(true); // Open the ManagerDetailModal
                    setIsOpen(false); // Close the BoatAccessModal
                  }}
                  className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
                >
                  Change
                </button>
              </div>
            </div>
            <div className="relative h-[80%] overflow-y-auto">
              <table className="min-w-full mb-4 text-white">
                <thead className="text-[11px] border-b-[1px] border-white/10 font-medium leading-[14.85px] text-white/50">
                  <tr>
                    <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                      Manager Name
                    </th>
                    <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                      Email
                    </th>
                    <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px] relative">
                      <JobType
                        setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                        jobTitleDropdownOpen={jobTitleDropdownOpen}
                        toggleJobTitleDropdown={toggleJobTitleDropdown}
                        jobType={jobType}
                        setJobType={setJobType}
                        jobTitles={accessManagers?.map((item) => item.jobtitle)}
                        setCurrentPage={() => {}}
                        isManager={true}
                      />
                    </th>
                    <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px] relative">
                      <LocationType
                        setLocationDropdownOpen={setLocationDropdownOpen}
                        locationDropdownOpen={locationDropdownOpen}
                        toggleLocationDropdown={toggleLocationDropdown}
                        locationType={locationType}
                        setLocationType={setLocationType}
                        setCurrentPage={() => {}}
                        locationTitles={accessManagers?.map(
                          (item) => item.location
                        )}
                        title="Location "
                      />
                    </th>
                  </tr>
                </thead>
                {loadingBoats ? (
                  <Fragment>
                    <MiniListLoader />
                  </Fragment>
                ) : (
                  <tbody>
                    {filteredData?.length > 0 ? (
                      <>
                        {filteredData?.map((manager, index) => (
                          <tr
                            key={index}
                            className="border-b-[1px] border-white/10"
                          >
                            <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                              {manager?.name}
                            </td>
                            <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                              {manager?.email}
                            </td>
                            <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                              {manager?.jobtitle || "---"}
                            </td>
                            <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                              {manager?.location || "---"}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-4 text-sm font-medium text-white"
                        >
                          No record found
                        </td>
                      </tr>
                    )}
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
