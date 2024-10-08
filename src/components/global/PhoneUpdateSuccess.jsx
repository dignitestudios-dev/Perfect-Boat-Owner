import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { CheckMark } from "../../assets/export";

const PhoneUpdateSuccess = ({ isOpen, setIsOpen }) => {
  const { navigate } = useContext(GlobalContext);
  const phoneUpdatedRef = useRef();
  const toggleModal = (e) => {
    if (
      phoneUpdatedRef.current &&
      !phoneUpdatedRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  }, []);

  return (
    <div
      onClick={toggleModal}
      className={`fixed top-0 left-0 w-screen h-screen transition-all duration-500 z-50 flex items-center justify-center ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div
        ref={phoneUpdatedRef}
        className="bg-[#02203A] w-[362px] h-[200px] flex flex-col  gap-5 justify-start items-center p-8 shadow-lg rounded-[8px]"
      >
        <img src={CheckMark} alt="success" />
        <div className="w-auto flex flex-col justify-center items-center gap-3">
          <div className="w-full h-auto flex flex-col justify-center items-center gap-1 ">
            <span className="text-[16px] leading-[21.6px] text-white font-normal text-center">
              Your phone number has been <br />
              successfully updated.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneUpdateSuccess;
