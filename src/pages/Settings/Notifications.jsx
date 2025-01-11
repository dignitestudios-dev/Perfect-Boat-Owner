import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { sampleNotifications } from "../../constants/notifications";
import { AuthMockup } from "../../assets/export";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import NotificationRow from "./NotificationRow";
import { GlobalContext } from "../../contexts/GlobalContext";

const Notifications = () => {
  const navigate = useNavigate();
  const {
    notifications,
    setNotifications,
    notificationUpdate,
    setNotificationUpdate,
  } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState("All");

  // const filterNotifications = () => {
  //   if (activeTab === "Read") {
  //     return sampleNotifications.filter((notification) => notification.read);
  //   } else if (activeTab === "Unread") {
  //     return sampleNotifications.filter((notification) => !notification.read);
  //   }
  //   return sampleNotifications;
  // };

  const [notificationLoading, setNotificationLoading] = useState(false);

  const getNotifications = async () => {
    setNotificationLoading(true);
    try {
      const { data } = await axios.get("/owner/notification");
      setNotifications(data?.data?.reverse());
    } catch (err) {
    } finally {
      setNotificationLoading(false);
    }
  };
  useEffect(() => {
    getNotifications();
  }, [notificationUpdate, activeTab]);

  // Calculate unread notifications count
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const [filteredNotifications, setFilteredNotifications] = useState([]);

  useEffect(() => {
    setFilteredNotifications(
      notifications.filter((notification) => {
        if (activeTab === "Read") return notification?.isRead;
        if (activeTab === "Unread") return !notification?.isRead;
        return true; // for "all" tab
      })
    );
  }, [activeTab, notifications]);

  // function navigator(type, id) {
  //   if (type == "task") {
  //     navigate(`/tasks/${id}`);
  //   } else if (type == "blog") {
  //     navigate(`/blogs/${id}`);
  //   } else {
  //     return;
  //   }
  // }

  const [updateLoading, setUpdateLoading] = useState(false);
  const [DeleteLoading, setDeleteLoading] = useState(false);

  const readAll = async () => {
    setUpdateLoading(true);
    try {
      const response = await axios.put("/owner/notification/read");
      if (response?.status == 200) {
        // setNotificationUpdate((prev) => !prev);
        // SuccessToast("Notification read successfully.");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Function to delete all notifications
  const deleteAll = async () => {
    setDeleteLoading(true);
    try {
      const deleteResponse = await axios.delete("/owner/notification");
      console.log("🚀 ~ deleteAll ~ deleteResponse:", deleteResponse);

      // Ensure response status is 200, and handle success accordingly
      if (deleteResponse?.status === 200) {
        setNotificationUpdate((prev) => !prev);
        SuccessToast("Notifications cleared successfully.");
      } else {
        // Handle cases where the status is not 200 (even if the request doesn't throw an error)
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      // Ensure only actual errors trigger the toast, using fallback message when necessary
      const errorMessage =
        err?.response?.data?.message ||
        "An error occurred. Please try again later.";
      ErrorToast(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col justify-start items-start gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
          Notifications
        </h1>
        <div className="w-full  border-b-[0.5px] border-white/15 flex  justify-between items-center h-[34px] text-base font-normal text-[#fff]/[50%]">
          <div className="w-auto h-[34px] flex gap-6 justify-start items-center">
            <button
              onClick={() => setActiveTab("All")}
              className={`px-2 h-[34px] ${
                activeTab == "All" &&
                "text-[#199BD1] font-bold  border-b-[3px] border-[#199BD1]"
              } `}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("Read")}
              className={`px-2 h-[34px] ${
                activeTab == "Read" &&
                "text-[#199BD1]  font-bold border-b-[3px] border-[#199BD1]"
              } `}
            >
              Read
            </button>
            <button
              onClick={() => {
                if (filteredNotifications.some((e) => e?.isRead === false)) {
                  readAll();
                }

                setActiveTab("Unread");
              }}
              className={`px-2 h-[34px] flex justify-between items-center gap-2 ${
                activeTab == "Unread" &&
                "text-[#199BD1]  font-bold border-b-[3px] border-[#199BD1]"
              } `}
            >
              <span>Unread</span>
              {updateLoading && (
                <FiLoader className="animate-spin text-lg ml-1" />
              )}
              <span className="bg-[#199BD1] text-white w-[18px] h-[18px] rounded-full  text-[9px] flex items-center justify-center">
                {unreadCount}
              </span>
            </button>
          </div>
          <button
            onClick={() => {
              filteredNotifications.length > 0 && deleteAll();
            }}
            className={`w-[107px] h-[32px] mb-2 text-[11px] flex items-center justify-center gap-1 font-bold rounded-[10px] text-white bg-[#199BD1]`}
          >
            Clear All
            {DeleteLoading && (
              <FiLoader className="animate-spin text-lg ml-1" />
            )}
          </button>
        </div>

        <div className="w-full">
          {filteredNotifications?.map((notification) => (
            <NotificationRow
              notification={notification}
              key={notification?._id}
              setNotificationUpdate={setNotificationUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
