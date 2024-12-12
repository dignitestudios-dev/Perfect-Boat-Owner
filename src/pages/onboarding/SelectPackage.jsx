import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import SelectPaymentMethod from "./SelectPaymentMethod";
import { AuthMockup } from "../../assets/export";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

const SelectPackage = () => {
  const { navigate } = useContext(GlobalContext);
  const { isFreeTrial } = useContext(AuthContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  const getPackage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/owner/subscription/plan?isWeb=true");
      setSubscriptions(data?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackage();
  }, []);

  const selectPlan = async (subId) => {
    try {
      const obj = {
        subscriptionPlanId: subId,
      };
      setSelectLoading(true);
      const response = await axios.post("/owner/subscription/selectPlan", obj);
      if (response?.status == 200) {
        navigate("/add-card");
      }
    } catch (error) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setSelectLoading(false);
    }
  };

  return (
    <div className="w-screen xl:h-[1024px] flex flex-col gap-4 py-6 px-4 xl:py-0 xl:px-0 items-center justify-center ">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full bg-[#001229] h-full flex flex-col items-center justify-center ">
          <h1 className="text-[40px] md:text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px] text-center">
            Subscribe
          </h1>
          <p className="w-full md:w-[70%] lg:w-[45%] text-center text-[16px] font-medium leading-[21.6px]    text-[#fff]/[0.5]">
            Find the ideal solution designed with your needs in mind. Our
            subscription offers exclusive features and benefits, delivering a
            personalized experience just for you and your organization
          </p>

          <div className="w-auto grid grid-cols-1  justify-center items-start mt-4 gap-6">
            {loading ? (
              <div className="w-[390px] h-[598px] rounded-[24px] bg-[#1A293D] p-8 flex flex-col gap-6 justify-start items-center animate-pulse">
                <span className="w-[120px] h-[42px] bg-[#001229] rounded-full" />

                <div className="w-auto relative flex gap-2 justify-start items-center">
                  {/* <span className="absolute top-2 -left-4 bg-gray-400 w-6 h-6 rounded-sm" /> */}
                  <span className="w-[100px] h-[72px] bg-gray-400" />
                  <span className="w-[60px] h-4 bg-gray-400 rounded-sm" />
                </div>

                <button className="outline-none bg-gray-400 rounded-full w-[126px] h-[44px]" />

                <ul className="w-full px-8 text-[16px] text-white font-normal flex flex-col gap-4 justify-start items-start">
                  {[...Array(5)].map((_, index) => (
                    <li
                      key={index}
                      className="w-full my-3 py-3 h-4 bg-gray-400 rounded-sm"
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <div className="w-[390px] h-[648px] rounded-[24px] bg-[#1A293D] pt-8 pb-4 px-8 flex flex-col justify-start items-center">
                <span
                  className="w-auto h-auto py-2 bg-[#001229] text-[14px] text-center tracking-[3px] font-semibold px-4 text-white
               rounded-full flex items-center justify-center"
                >
                  {subscriptions[0]?.name}
                </span>

                <div className="w-auto relative flex justify-start items-center mt-8">
                  <span className="absolute top-2 -left-4 text-xl font-medium text-white">
                    $
                  </span>
                  <span className="text-[72px] font-bold text-white">
                    {subscriptions[0]?.annualPrice}
                  </span>
                  <span className="text-[14px] font-normal text-white">
                    /Year
                  </span>
                  {isFreeTrial && (
                    <span className="absolute -top-4 right-6 text-[12px] font-medium text-slate-700 bg-slate-200 p-1 rounded-3xl">
                      Includes Free Trial
                    </span>
                  )}
                </div>

                <button
                  onClick={() => selectPlan(subscriptions[0]?._id)}
                  className="outline-none bg-[#55C9FA] text-white rounded-full w-[126px] h-[44px] flex items-center
                  justify-center font-[550]"
                >
                  <div className="flex items-center">
                    <span className="mr-1">Buy now </span>
                    {selectLoading && (
                      <FiLoader className="animate-spin text-lg mx-auto" />
                    )}
                  </div>
                </button>

                <ul
                  className="mt-3 w-full px-8 text-[16px] text-white font-normal flex flex-col gap-2
                 justify-start items-start list-disc border-b border-[#243347] pb-3"
                >
                  {subscriptions[0]?.features.map((item, index) => {
                    if (index < 5) {
                      return <li key={index}>{item}</li>;
                    }
                  })}
                </ul>

                <div className="bg-[#199BD11F] text-white rounded-xl px-6 py-2 mt-2">
                  <p className="font-semibold pb-1">Important Note</p>
                  <p>
                    A one-time license fee of ${subscriptions[0]?.annualPrice}{" "}
                    applies and renews annually. A monthly cost of $
                    {subscriptions[0]?.price} per user will apply for each
                    employee added.
                  </p>
                </div>
              </div>
            )}

            {/* Repeat for other packages as needed */}
          </div>

          {/* {modalIsOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-[#1A293D] w-full lg:w-[693px] p-8 rounded-xl ">
                {" "}
                <SelectPaymentMethod />
                <button
                  onClick={closeModal}
                  className="w-full h-[52px] mt-14 bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
                >
                  Back
                </button>
              </div>
            </div>
          )} */}
        </div>
        <div className=" lg:flex hidden relative h-full">
          <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-0"></span>

          <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default SelectPackage;
