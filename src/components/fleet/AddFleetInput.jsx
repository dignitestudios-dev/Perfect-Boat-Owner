import React from "react";

const AddFleetInput = ({  label, type, placeholder, error, register, onInput ,isDisabled}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="text-[16px] font-medium leading-[21.6px]">{label}</label>
      <div className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center ${error && "border-red-500"}`}>
        <input
          disabled={isDisabled}
          type={type}
          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400"
          placeholder={placeholder}
          {...register}
          onInput={onInput}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error?.message}</p>}
    </div>
  );
};

export default AddFleetInput;
