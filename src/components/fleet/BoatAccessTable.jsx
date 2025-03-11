import React, { useState } from "react";
import { TbCaretDownFilled } from "react-icons/tb";
import JobType from "../global/headerDropdowns/JobType";
import LocationType from "../global/headerDropdowns/LocationType";

const BoatAccessTable = ({
  boatsData,
  setIsManagerModalOpen,
  isEditing,
  setIsBoatModalOpen,
}) => {
  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const filteredData = boatsData?.boatAccess?.filter((item) => {
    const jobTypeMatch =
      jobType && jobType.length !== 0
        ? jobType?.includes(item?.jobtitle?.toLowerCase())
        : true;
    const locationTypeMatch =
      locationType && locationType.length !== 0
        ? locationType?.includes(item?.location?.toLowerCase())
        : true;
    return locationTypeMatch && jobTypeMatch;
  });

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex">
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white mr-2">
            Boat Access
            <span className="text-[12px] font-normal text-white/50"></span>
          </h3>
          {isEditing ? (
            <button
              type="button"
              onClick={() => setIsBoatModalOpen(true)}
              className="text-[14px] font-medium text-[#199bd1] ml-2"
            >
              Change
            </button>
          ) : (
            <span></span>
          )}
        </div>
        {boatsData?.boatAccess?.length > 0 ? (
          <button
            disabled={boatsData?.boatAccess?.length === 0}
            type="button"
            onClick={() => setIsManagerModalOpen(true)}
            className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199bd1]"
          >
            View All
          </button>
        ) : (
          <div></div>
        )}
      </div>

      <div className="w-full flex flex-col gap-1 justify-start items-start">
        <div className="w-full grid grid-cols-4 text-[13px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
          <span className="w-full flex justify-start items-center">Name</span>
          <span className="w-full flex justify-start items-center">Email</span>
          <span className="w-full flex justify-start items-center relative">
            <JobType
              setJobTitleDropdownOpen={setJobTitleDropdownOpen}
              jobTitleDropdownOpen={jobTitleDropdownOpen}
              toggleJobTitleDropdown={toggleJobTitleDropdown}
              jobType={jobType}
              setJobType={setJobType}
              isManager={true}
            />
          </span>

          <span className="w-full flex justify-start items-center relative">
            <LocationType
              setLocationDropdownOpen={setLocationDropdownOpen}
              locationDropdownOpen={locationDropdownOpen}
              toggleLocationDropdown={toggleLocationDropdown}
              locationType={locationType}
              setLocationType={setLocationType}
              title="Location / Customer Name"
            />
          </span>
        </div>
        {filteredData?.length > 0 ? (
          <>
            {filteredData?.map((manager, index) => {
              if (index < 4) {
                return (
                  <div
                    key={index}
                    className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                  >
                    <span className="w-full flex justify-start items-center">
                      {manager?.name}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {manager?.email}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {manager?.jobtitle || "---"}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {manager?.location || "---"}
                    </span>
                  </div>
                );
              }
            })}
          </>
        ) : (
          <p>No record found</p>
        )}
      </div>
    </div>
  );
};

export default BoatAccessTable;
