import React, { useEffect, useState } from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import CancelPlanModal from "../Settings/CancelPlanModal";
import axios from "../../axios";
import moment from "moment/moment";

const Billing = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("licenseFee");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const getBilling = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/owner/profile/billings");
      setData(data?.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBilling();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  const calculateDaysRemaining = (expirationTimestamp) => {
    const currentDate = new Date();
    const expirationDate = new Date(expirationTimestamp * 1000);
    const daysRemaining = Math.ceil(
      (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
    );
    return daysRemaining;
  };

  const downloadCSV = () => {
    if (!data?.SubcriptionInvoice) return;

    // CSV Header
    let csvContent = "Invoice Date,Amount (USD),Plan\n";

    // Populate CSV rows
    data.SubcriptionInvoice.forEach((transaction) => {
      const date = formatDate(transaction?.updatedAt);
      const amount = transaction?.price;
      const plan = transaction?.subscriptionPlan?.name;
      csvContent += `${date},${amount},${plan}\n`;
    });

    // Create a blob from the data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Billing_History.csv");
    link.click();
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
          {/* <button className="bg-[#119bd1] text-white px-4 py-2 rounded-lg text-sm font-medium">
            Save
          </button> */}
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full flex flex-col rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Current Plan</h2>
            </div>
            <p className="text-xsm leading-[20px] text-gray-500 ">
              Securely manage your current plan and debit card details.
            </p>
          </div>

          <div className="w-full flex flex-col bg-[#24344D] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-[#119bd1]">
                {calculateDaysRemaining(data?.SubscriptionPlan?.expireOn)} Days
                Remaining
              </span>
            </div>
            <div className="flex items-center bg-[#1A293D] rounded-md px-4 py-2">
              <div className="flex items-center flex-grow">
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                  alt="card icon"
                  className="w-12 h-12 mr-4"
                />
                <span className="text-sm">
                  **** **** **** {data?.card?.number}
                </span>
              </div>
              <div className="flex flex-col items-center ml-4">
                <div className="flex items-center gap-[250px]">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-[#888]">
                      Name on Card
                    </span>
                    <span className="text-xs">{data?.card?.name}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-[#888]">
                      Expires
                    </span>
                    <span className="text-xs ">{data?.card?.expireOn}</span>
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
              <button
                className="bg-[#199bd1]/[0.2] text-[#199BD1] px-4 py-2 rounded-lg text-sm font-medium"
                onClick={downloadCSV}
              >
                Download All
              </button>
            </div>
            <p className="text-xsm leading-[20px] mb-4 text-gray-500">
              Track and access your detailed invoices effortlessly.
            </p>
            <div className="w-full">
              {/* Toggle Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setActiveTab("licenseFee")}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    activeTab === "licenseFee"
                      ? "bg-[#199bd1]/[0.2] text-[#199BD1]"
                      : "bg-[#199BD1] text-white"
                  }`}
                >
                  License Fee
                </button>
                <button
                  onClick={() => setActiveTab("userCharges")}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    activeTab === "userCharges"
                      ? "bg-[#199bd1]/[0.2] text-[#199BD1]"
                      : "bg-[#199BD1] text-white"
                  }`}
                >
                  User Charges
                </button>
              </div>

              {/* License Fee Table */}
              {activeTab === "licenseFee" && (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#24344D]">
                      <th className="pb-2 text-gray-500">Invoice</th>
                      <th className="pb-2 text-gray-500">Amount</th>
                      <th className="pb-2 text-gray-500">Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.SubcriptionInvoice?.map((transaction, idx) => (
                      <tr key={idx} className="border-b border-[#24344D]">
                        <td className="py-2">
                          Invoice - {formatDate(transaction?.updatedAt)}
                        </td>
                        <td className="py-2">USD ${transaction?.price}</td>
                        <td className="py-2">
                          {transaction?.subscriptionPlan?.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* User Charges Table */}
              {activeTab === "userCharges" && (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#24344D]">
                      <th className="pb-2 text-gray-500">Invoice</th>
                      <th className="pb-2 text-gray-500">Amount</th>
                      <th className="pb-2 text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.EmployeeInvoice?.map((transaction, idx) => (
                      <tr key={idx} className="border-b border-[#24344D]">
                        <td className="py-2">
                          {moment(transaction?.createdAt)?.format("MM-DD-YYYY")}
                        </td>
                        <td className="py-2">
                          USD ${parseFloat(transaction?.price).toFixed(1)}
                        </td>
                        <td className="py-2">{transaction?.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <CancelPlanModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Billing;
