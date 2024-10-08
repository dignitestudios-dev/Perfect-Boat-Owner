import React from "react";
import { FiUpload } from "react-icons/fi";
const AddFleetImage = () => {
  return (
    <div className="w-[47%] md:w-[30%] lg:w-[175px] h-auto text-white flex flex-col justify-start items-start gap-2">
      <button className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
        <FiUpload />
      </button>
      <div className="w-auto ml-1 flex gap-2 justify-start items-center">
        <input
          type="checkbox"
          className="w-3 h-3 rounded-full accent-white outline-none border-none"
        />
        <span className="text-[12px] font-medium leading-[16.3px]">
          Set as cover photo
        </span>
      </div>
    </div>
  );
};

export default AddFleetImage;
