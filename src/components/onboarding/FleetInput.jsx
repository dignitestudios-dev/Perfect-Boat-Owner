import React from "react";

export const FleetInput = ({
  label,
  type,
  placeholder,
  error,
  onChange,
  value,
  onInput,
  isDisabled,
  maxLength,
  isPhone = false,
}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="text-[16px] font-medium leading-[21.6px]">
        {label}
      </label>
      <div
        className={`w-full h-[52px] bg-[#1A293D] outline-none px-0 focus-within:border-[1px] rounded-xl flex items-center ${
          error ? "border-red-500" : "focus-within:border-[#55C9FA]"
        }`}
      >
        <div
          className={` w-full  h-full flex items-center justify-center rounded-[12px] relative`}
        >
          {isPhone && (
            <span
              className="  w-14 rounded-l-[12px] flex justify-center items-center bg-[#16202e]
             text-md font-medium text-white h-full"
              style={{
                color: "#6B7373",
              }}
            >
              +1
            </span>
          )}
          <input
            disabled={isDisabled}
            type={type}
            maxLength={maxLength}
            className="w-full h-full bg-transparent pl-2 autofill:bg-transparent autofill:text-white outline-none text-white
             placeholder:text-gray-400"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
            onInput={onInput}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
