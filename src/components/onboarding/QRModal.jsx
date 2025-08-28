import React, { useRef } from "react";
import { QR, QRIOS } from "../../assets/export";

const QRModal = ({ isOpen, setIsOpen }) => {
  const qrRef = useRef();

  const toggleModal = (e) => {
    if (qrRef.current && !qrRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  return (
    <div
      onClick={toggleModal}
      className={`w-screen h-screen flex justify-center items-center gap-2 transition-all duration-500 z-50 fixed top-0 left-0 ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div
        ref={qrRef}
        className="w-full lg:w-[670px] h-auto lg:h-[620px] flex flex-col gap-16 items-center rounded-[18px] justify-center bg-[#1A293D] shadow-sm"
      >
        <h1 className="font-normal text-[24px] leading-[32.4px] text-white text-center">
          Scan the QR code to download the android app
        </h1>
        <img src={QR} alt="qrcode" className="w-[274px] h-[274px]" />
      </div>
      <div
        ref={qrRef}
        className="w-full lg:w-[670px] h-auto lg:h-[620px] flex flex-col gap-16 items-center rounded-[18px] justify-center bg-[#1A293D] shadow-sm"
      >
        <h1 className="font-normal text-[24px] leading-[32.4px] text-white text-center">
          Scan the QR code to download the IOS app
        </h1>
        <img src={QRIOS} alt="qrcode" className="w-[274px] h-[274px]" />
      </div>
    </div>
  );
};

export default QRModal;
