import React, { useContext, useEffect, useRef } from "react";
import { CheckMark } from "../../assets/export";
import { GlobalContext } from "../../contexts/GlobalContext";

const AccountCreateSuccess = ({ isOpen, setIsOpen }) => {
  const { navigate } = useContext(GlobalContext);
  const successRef = useRef();

  const toggleModal = (e) => {
    if (successRef.current && !successRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Set a timeout to redirect after a few seconds
      const timeout = setTimeout(() => {
        setIsOpen(false); // Close the modal before navigating
        navigate("/welcome-aboard");
      }, 3000); // Adjust the timeout duration as needed (3000 ms = 3 seconds)

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeout);
    }
  }, [isOpen, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-50 transition-all duration-500">
      <div
        ref={successRef}
        className="bg-[#02203A] w-[418px] h-[269px] flex flex-col gap-5 justify-start items-center p-8 shadow-md rounded-[8px]"
      >
        <img src={CheckMark} alt="success" className="" />
        <div className="w-auto flex flex-col justify-center items-center gap-3">
          <h1 className="text-[22px] leading-[29.7px] text-white font-bold">
            Congratulations
          </h1>
          <span className="text-[16px] leading-[21.6px] text-white font-normal text-center">
            You’ve successfully subscribed to Fleet Enterprise. Enjoy premium
            features and benefits.
          </span>
        </div>
        {/* Close Button */}
        {/* <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          X
        </button> */}
      </div>
    </div>
  );
};

export default AccountCreateSuccess;
