import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const AuthInput = ({
  state,
  setState,
  maxLength,
  text,
  type,
  error,
  placeholder,
  register,
  onInput,
  isPhone = false,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
      <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
        {text}
      </label>
      <div
        className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start  ${
          error && "error"
        } `}
      >
        <div
          className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
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
            type={isPassVisible ? "text" : type}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full outline-none  rounded-[12px] autofill:bg-transparent autofill:text-white placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium "
            // value={state}
            // onChange={(e) => setState(e.target.value)}
            {...register}
            onInput={onInput}
          />
          <span
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="cursor-pointer absolute top-4 text-lg right-2"
            style={{
              color: "#6B7373",
            }}
          >
            {type == "password" &&
              (!isPassVisible ? <BsEyeSlash /> : <BsEye />)}
          </span>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default AuthInput;
