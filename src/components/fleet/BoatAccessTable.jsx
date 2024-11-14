import React from "react";
import { TbCaretDownFilled } from "react-icons/tb";

const BoatAccessTable = ({
  boatsData,
  setIsManagerModalOpen,
  togglejobFilter,
  jobRef,
  jobFilter,
  toggleLocationFilter,
  locationRef,
  locationFilter,
}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <div className="w-full h-auto flex justify-between items-center">
        <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
          Boat Access
          <span className="text-[12px] font-normal text-white/50"></span>
        </h3>
      </div>

      <div className="w-full h-auto flex justify-between items-center">
        {boatsData?.boatAccess?.length === 0 ? (
          <div></div>
        ) : (
          <div className="flex w-1/2 lg:w-[395px] h-[32px] justify-start items-start rounded-[8px] relative">
            <p>Manager Names have access to all boats by default</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsManagerModalOpen(true)}
          className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199bd1]"
        >
          View All
          {/* Display text or employee name here */}
          {/* Assign Employee */}
        </button>
      </div>

      <div className="w-full flex flex-col gap-1 justify-start items-start">
        <div className="w-full grid grid-cols-4 text-[13px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
          <span className="w-full flex justify-start items-center">Name</span>
          <span className="w-full flex justify-start items-center">Email</span>
          <span className="w-full flex justify-start items-center relative">
            <button
              type="button"
              onClick={togglejobFilter}
              className="flex items-center gap-1"
            >
              Job Title
              <TbCaretDownFilled />
            </button>
            <div
              ref={jobRef}
              className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                jobFilter ? "scale-100" : "scale-0"
              } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
            >
              {["Job Title 1", "Job Title 2", "Job Title 3"].map(
                (jobTitle, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-start items-start gap-2"
                  >
                    <input
                      type="checkbox"
                      className="w-3 h-3 accent-[#199BD1]"
                    />
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      {jobTitle}
                    </span>
                  </div>
                )
              )}
            </div>
          </span>

          <span className="w-full flex justify-start items-center relative">
            <button
              type="button"
              onClick={toggleLocationFilter}
              className="flex items-center gap-1"
            >
              Location
              <TbCaretDownFilled />
            </button>
            <div
              ref={locationRef}
              className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                locationFilter ? "scale-100" : "scale-0"
              } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
            >
              {["East California Dock", "West Dock", "South Dock"].map(
                (location, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-start items-start gap-2"
                  >
                    <input
                      type="checkbox"
                      className="w-3 h-3 accent-[#199BD1]"
                    />
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      {location}
                    </span>
                  </div>
                )
              )}
            </div>
          </span>
        </div>
        {boatsData?.boatAccess?.length > 0 ? (
          <>
            {boatsData?.boatAccess?.map((manager, index) => {
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
