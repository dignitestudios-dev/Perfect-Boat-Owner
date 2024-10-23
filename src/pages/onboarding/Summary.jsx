import React, { useContext, useState } from "react";
import { AuthMockup, MasterCardIcon } from "../../assets/export";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import AccountCreateSuccess from "../../components/onboarding/AccountCreateSuccess";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import SummaryLoader from "../../components/loaders/SummaryLoader";
import { ErrorToast } from "../../components/global/Toaster";

const Summary = () => {
  const { navigate } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const getSummary = async () => {
    try {
      setSummaryLoading(true);
      const { data } = await axios.get("/owner/subscription/getSummary");
      setSummary(data?.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  const handleCompleteBuy = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/owner/subscription/buy");
      if (response.status === 200) {
        setLoading(false);
        setModalOpen(true);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("🚀  handleCompleteBuy  err:", err);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <div className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-start gap-8">
        <h1 className="w-full justify-start items-start text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
          Summary
        </h1>
        {summaryLoading ? (
          <SummaryLoader />
        ) : (
          <>
          <div className="w-full flex flex-col justify-start items-start gap-8">
          <div className="w-full flex flex-col justify-start items-start gap-1">
            <div className="w-auto h-8 flex justify-start items-center gap-2">
              <h1 className="text-[18px] font-bold text-white leading-[24.3px]">
                {summary?.subscriptionPlan?.name}
              </h1>
              {/* <Link
                to="/select-package"
                className="text-[11px] text-[#199BD1] leading-[24.2px] font-medium  tracking-[-0.24px]"
              >
                Change
              </Link> */}
            </div>

            <span className="text-[16px] font-normal leading-5 text-white">
              {summary?.subscriptionPlan?.description}
            </span>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-4">
            <div className="w-auto h-8 flex justify-start items-center gap-2">
              <h1 className="text-[18px] font-bold text-white leading-[24.3px]">
                Payment Method
              </h1>
            </div>

            <div className="w-auto flex flex-col justify-start items-start gap-1">
              <span className="text-[16px] font-medium leading-5 text-white">
                Your Debit Card
              </span>
              <div className="w-full p-4 bg-[#21344C] rounded-xl border border-[#55C9FA] grid gap-4 grid-cols-1 lg:grid-cols-8">
                <img
                  src={MasterCardIcon}
                  alt="MasterCard"
                  className="col-span-1 lg:col-span-1"
                />
                <span className="col-span-1 lg:col-span-3 text-xl text-white">
                  ****-****-****-{summary?.card?.number}
                </span>
                <div className="col-span-1 lg:col-span-2">
                  <span className="block text-sm font-medium text-white">
                    Name On Card
                  </span>
                  <span className="block text-sm text-white">
                    {summary?.card?.name}
                  </span>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <span className="block text-sm font-medium text-white">
                    Expires On
                  </span>
                  <span className="block text-sm text-white">
                    {summary?.card?.expireOn}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex h-10 relative justify-end items-end gap-2">
            <span className="text-[16px] font-medium leading-[0px] tracking-[-0.24px] text-white">
              Total Amount:
            </span>
            <span className="text-[24px] font-bold text-white leading-[0px] tracking-[-0.24px]">
              ${summary?.subscriptionPlan?.price}
            </span>
            <span className="text-[10px] font-normal  leading-[0px]  text-white">
              /year
            </span>
          </div>
        </div>
        <div className="w-full flex justify-end items-center">
          <div className="w-full flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full lg:w-[180px] h-[48px] bg-[#02203A] text-[#199BD1] rounded-md text-[16px] font-bold"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleCompleteBuy}
              disabled={loading}
              className="w-full lg:w-[180px] h-[48px] bg-[#199BD1] text-white rounded-md text-[16px] font-bold
            flex items-center justify-center"
            >
              <div className="flex items-center">
                <span className="mr-1">Save</span>
                {loading && (
                  <FiLoader className="animate-spin text-lg mx-auto" />
                )}
              </div>
            </button>

            {modalOpen && (
              <AccountCreateSuccess
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
              />
            )}
          </div>
        </div>
          </>
        )}
      </div>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-4"></span>

        <img
          src={AuthMockup}
          alt="auth_mockup"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Summary;
