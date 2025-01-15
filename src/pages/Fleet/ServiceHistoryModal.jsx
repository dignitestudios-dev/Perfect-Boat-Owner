import axios from "../../axios";
import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { SuccessToast } from "../../components/global/Toaster";

const ServiceHistoryModal = ({ isOpen, onClose, id }) => {
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  const handleDownload = async () => {
    setLoadingDownload(true);
    try {
      const response = await axios.get(`/owner/boat/${id}/excel`);
      if (response?.status === 200) {
        const result = response?.data;
        if (result?.success && result?.data) {
          const result = response?.data;
          if (result?.success && result?.data) {
            const downloadUrl = result?.data.fileAddress;
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } else {
          console.error("Failed to fetch download link:", response?.message);
        }
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoadingDownload(false);
    }
  };

  const handleEmail = async () => {
    setLoadingEmail(true);
    try {
      const response = await axios.get(`/owner/boat/${id}/excel/email`);
      if (response?.status === 200) {
        const result = response?.data;
        SuccessToast("Boat History Sent");
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoadingEmail(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001229] bg-opacity-50">
      <div className="relative bg-[#001229] rounded-lg shadow-md w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-800"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#36B8F3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-4 text-center items-center">
          <MdAccessTime className="mx-auto mb-4 text-[#36B8F3] bg-[#001F3F] p-2 w-12 h-12 rounded-full" />
          <p className="mb-5 text-lg font-normal text-white">
            Choose an option to access comprehensive service history for this
            boat
          </p>
          {/* Add your modal content here */}
          <button
            onClick={handleEmail}
            disabled={loadingEmail}
            type="button"
            className="bg-[#1A293D] text-[#36B8F3] py-2 px-4 rounded-lg"
          >
            <div className="flex items-center">
              <span className=" w-full mr-1 text-center">
                Send a copy via email
              </span>
              {loadingEmail && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
          &nbsp; &nbsp;
          <button
            onClick={handleDownload}
            disabled={loadingDownload}
            type="button"
            className="bg-[#36B8F3] text-white py-2 px-4 rounded-lg w-44 "
          >
            <div className="flex items-center">
              <span className=" w-full mr-1 text-center">Download</span>
              {loadingDownload && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistoryModal;
