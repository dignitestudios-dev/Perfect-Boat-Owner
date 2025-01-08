import React, { useState, useRef, useEffect, Fragment } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import axios from "../../axios";
import BoatsLoader from "../../components/fleet/BoatsLoader";
import MiniListLoader from "../../components/global/MiniListLoader";
import JobType from "../../components/global/headerDropdowns/JobType";
import LocationType from "../../components/global/headerDropdowns/LocationType";

const BoatAccessModal = ({
  setIsOpen,
  isManagerDetailModalOpen,
  setIsManagerDetailModalOpen,
  boatId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [loadingBoats, setLoadingBoats] = useState(false);
  const [boats, setBoats] = useState([]);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const filteredData = boats?.filter((item) => {
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
      setBoats(data?.data?.boatAccess);
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
                      <JobType
                        setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                        jobTitleDropdownOpen={jobTitleDropdownOpen}
                        toggleJobTitleDropdown={toggleJobTitleDropdown}
                        jobType={jobType}
                        setJobType={setJobType}
                        isManager={true}
                      />
                    </th>
                    <th className="px-4 py-2 relative">
                      <LocationType
                        setLocationDropdownOpen={setLocationDropdownOpen}
                        locationDropdownOpen={locationDropdownOpen}
                        toggleLocationDropdown={toggleLocationDropdown}
                        locationType={locationType}
                        setLocationType={setLocationType}
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
                          <tr key={index} className="border-b border-[#2A394C]">
                            <td className="px-4 py-2">{manager?.name}</td>
                            <td className="px-4 py-2">{manager?.email}</td>
                            <td className="px-4 py-2">
                              {manager?.jobtitle || "---"}
                            </td>
                            <td className="px-4 py-2">
                              {manager?.location || "---"}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td className="px-4 py-2 text-[14px] font-medium leading-[14.85px]">
                          <div className="pt-4 ">No record found</div>
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
