import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import getFCMToken from "../firebase/getFcmToken";
import { onMessageListener } from "../firebase/messages";
import { ErrorToast } from "../components/global/Toaster";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const test = "";

  function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
  }

  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false);
  const [updateManager, setUpdateManager] = useState(false);

  const getManagers = async () => {
    setLoadingManagers(true);
    try {
      const { data } = await axios.get("/owner/manager");
      setManagers(data?.data);
    } catch (err) {
    } finally {
      setLoadingManagers(false);
    }
  };
  useEffect(() => {
    getManagers();
  }, [updateManager]);

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [updateEmployee, setUpdateEmployee] = useState(false);

  const getEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const { data } = await axios.get("/owner/employees");
      setEmployees(data?.data);
    } catch (err) {
    } finally {
      setLoadingEmployees(false);
    }
  };
  useEffect(() => {
    getEmployees();
  }, [updateEmployee]);

  const [boats, setBoats] = useState([]);
  const [loadingBoats, setLoadingBoats] = useState(false);
  const [updateBoat, setUpdateBoat] = useState(false);

  const getBoats = async () => {
    setLoadingBoats(true);
    try {
      const { data } = await axios.get("/owner/boat");
      setBoats(data?.data);
    } catch (err) {
    } finally {
      setLoadingBoats(false);
    }
  };
  useEffect(() => {
    getBoats();
  }, [updateBoat]);

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [notifications, setNotifications] = useState([]);
  const [notificationUpdate, setNotificationUpdate] = useState(false);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setNotificationUpdate((prev) => !prev);
      setTimeout(() => {
        setShow(false);
        setNotification({ title: "", body: "" });
      }, 3000);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <GlobalContext.Provider
      value={{
        test,
        navigate,
        formatTimestampToDate,
        getManagers,
        getEmployees,
        getBoats,
        setUpdateEmployee,
        setUpdateManager,
        setUpdateBoat,
        loadingBoats,
        loadingEmployees,
        loadingManagers,
        managers,
        boats,
        employees,
        show,
        setShow,
        notification,
        setNotification,
        notifications,
        setNotifications,
        notificationUpdate,
        setNotificationUpdate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
