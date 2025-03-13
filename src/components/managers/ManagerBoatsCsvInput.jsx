import React from "react";

const ManagerBoatsCsvInput = ({
  passSelectedBoat,
  setIsBoatModalOpen,
  setInputIndex,
  index,
}) => {
  // setInputError({});
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <div className="w-full justify-between flex">
        <span className="text-[16px] font-medium leading-[21.6px]">
          Select Boat
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsBoatModalOpen(true);
          setInputIndex(index);
        }} // Open the Boat Modal
        className="w-full h-[52px] bg-[#1A293D] disabled:text-white/50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
      >
        <span
          className={`w-full ${
            passSelectedBoat?.length ? "text-white" : "text-gray-400"
          }  flex justify-start`}
        >
          {/* Display text or selected boat name here */}
          {passSelectedBoat?.length
            ? `${passSelectedBoat?.length} Boat(s) selected`
            : "Select Boat"}
        </span>
      </button>
    </div>
  );
};

export default ManagerBoatsCsvInput;
