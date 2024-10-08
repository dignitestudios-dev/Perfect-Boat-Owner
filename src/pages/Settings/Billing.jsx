import React, { useState } from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import CancelPlanModal from "../Settings/CancelPlanModal";

const Billing = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 px-5 pb-5 md:px-0 text-white">
      <div className="w-full flex flex-col justify-start gap-8 items-start">
        <div className="flex w-full justify-between items-start">
          <div>
            <h1 className="text-[24px] font-bold leading-[32.4px]">Billing</h1>
            <p className="text-xsm leading-[20px] text-gray-500">
              Stay on top of your expenses, plans, and payment history with our
              comprehensive billing features.
            </p>
          </div>
          <button className="bg-[#119bd1] text-white px-4 py-2 rounded-lg text-sm font-medium">
            Save Changes
          </button>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full flex flex-col rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Current Plan</h2>
            </div>
            <p className="text-xsm leading-[20px] text-gray-500 ">
              Securely manage your current plan and debit card details. Your
              account information, just a tap away for effortless control and
              peace of mind.
            </p>
          </div>

          <div className="w-full flex flex-col bg-[#24344D] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              {/* <h3 className="text-xl font-semibold flex items-center">
                Fleet Pro
                <a href="#" className="text-[#119bd1] text-sm ml-4">
                  Update Plan
                </a>
              </h3> */}
              <span className="text-sm text-[#119bd1]">21 Days Remaining</span>
            </div>
            <div className="flex items-center bg-[#1A293D] rounded-md px-4 py-2">
              <div className="flex items-center flex-grow">
                <input type="radio" className="mr-2" />
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                  alt="card icon"
                  className="w-12 h-12 mr-4"
                />
                <span className="text-sm">**** **** **** 3258</span>
              </div>
              <div className="flex flex-col items-center ml-4">
                <div className="flex items-center gap-[250px]">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-[#888]">
                      Name on Card
                    </span>
                    <span className="text-xs">Mike Smith</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-[#888]">
                      Expires
                    </span>
                    <span className="text-xs ">0000</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="text-red-500 text-sm mt-4 text-left"
              onClick={handleOpenModal}
            >
              Cancel Subscription
            </button>
          </div>

          <div className="w-full flex flex-col p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Billing History</h2>
              <button className="bg-[#199bd1]/[0.2] text-[#199BD1] px-4 py-2 rounded-lg text-sm font-medium">
                Download All
              </button>
            </div>
            <p className="text-xsm leading-[20px] mb-4 text-gray-500">
              Track and access your detailed invoices effortlessly. Stay
              organized with a clear record of your financial transactions for
              each billing cycle. We will show the history for a year at a time.
            </p>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#24344D]">
                  <th className="pb-2 text-gray-500" >Invoice</th>
                  <th className="pb-2 text-gray-500">Amount</th>
                  <th className="pb-2 text-gray-500 ">Plan</th>
                </tr>
              </thead>
              <tbody>
                {Array(6)
                  .fill()
                  .map((_, idx) => (
                    <tr key={idx} className="border-b border-[#24344D]">
                      <td className="py-2">Invoice - Nov 2023</td>
                      <td className="py-2">USD $100</td>
                      <td className="py-2">Fleet Pro</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CancelPlanModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Billing;
