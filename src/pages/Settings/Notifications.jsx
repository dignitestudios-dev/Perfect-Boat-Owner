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

  const filterNotifications = () => {
    if (activeTab === "Read") {
      return sampleNotifications.filter((notification) => notification.read);
    } else if (activeTab === "Unread") {
      return sampleNotifications.filter((notification) => !notification.read);
    }
    return sampleNotifications;
  };

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
  }, [notificationUpdate]);

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

  function navigator(type, id) {
    if (type == "task") {
      navigate(`/tasks/${id}`);
    } else if (type == "blog") {
      navigate(`/blogs/${id}`);
    } else {
      return;
    }
  }

  const [updateLoading, setUpdateLoading] = useState(false);
  const readAll = async () => {
    setUpdateLoading(true);
    try {
      const response = await axios.put("/owner/notification/read");
      if (response?.status == 200) {
        setNotificationUpdate((prev) => !prev);
        SuccessToast("Notification cleared successfully.");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setUpdateLoading(false);
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
              onClick={() => setActiveTab("Unread")}
              className={`px-2 h-[34px] flex justify-between items-center gap-2 ${
                activeTab == "Unread" &&
                "text-[#199BD1]  font-bold border-b-[3px] border-[#199BD1]"
              } `}
            >
              <span>Unread</span>
              <span className="bg-[#199BD1] text-white w-[18px] h-[18px] rounded-full  text-[9px] flex items-center justify-center">
                {unreadCount}
              </span>
            </button>
          </div>
          <button
            onClick={readAll}
            className={`w-[107px] h-[32px] mb-2 text-[11px] flex items-center justify-center gap-1 font-bold rounded-[10px] text-white bg-[#199BD1]`}
          >
            Clear All
            {updateLoading && (
              <FiLoader className="animate-spin text-lg ml-1" />
            )}
          </button>
        </div>
        {/* <div className="w-full flex items-center justify-between  gap-6">
          <div className="flex items-center">
            <div className="">
              <button
                className={`text-base font-normal ${
                  activeTab === "All" ? "text-[#199BD1]" : "text-[#707070]"
                } px-6`}
                onClick={() => setActiveTab("All")}
              >
                All
              </button>
              {activeTab === "All" ? (
                <div className="w-full h-[0.5px] flex justify-center items-center bg-[#fff]/[0.14]">
                  <div className="bg-[#199BD1] w-full h-[3px] rounded-full mx-auto" />
                </div>
              ) : (
                <div className="bg-[#fff]/[0.14] w-full h-[0.5px] rounded-full" />
              )}
            </div>
            <div className="">
              <button
                className={`text-base font-normal ${
                  activeTab === "Read" ? "text-[#199BD1]" : "text-[#707070]"
                } px-6`}
                onClick={() => setActiveTab("Read")}
              >
                Read
              </button>
              {activeTab === "Read" ? (
                <div className="w-full h-[0.5px] flex justify-center items-center bg-[#fff]/[0.14]">
                  <div className="bg-[#199BD1] w-full h-[3px] rounded-full mx-auto" />
                </div>
              ) : (
                <div className="bg-[#fff]/[0.14] w-full h-[0.5px] rounded-full" />
              )}
            </div>
            <div className="">
              <button
                className={`text-base font-normal ${
                  activeTab === "Unread" ? "text-[#199BD1]" : "text-[#707070]"
                }  flex gap-2 items-center px-6`}
                onClick={() => setActiveTab("Unread")}
              >
                Unread{" "}
                <div className="bg-[#199BD1] text-white w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center">
                  15
                </div>
              </button>
              {activeTab === "Unread" ? (
                <div className="w-full h-[0.5px] flex justify-center items-center bg-[#fff]/[0.14]">
                  <div className="bg-[#199BD1] w-full h-[3px] rounded-full mx-auto" />
                </div>
              ) : (
                <div className="bg-[#fff]/[0.14] w-full h-[0.5px] rounded-full" />
              )}
            </div>
          </div>
          {/* <button className="bg-[#199BD1] rounded-full text-[13px] font-semibold text-white py-2.5 w-[118px]">
          Clear All
        </button>
        </div>  */}
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
