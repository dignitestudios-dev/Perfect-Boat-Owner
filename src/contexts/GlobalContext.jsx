import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import getFCMToken from "../firebase/getFcmToken";
import { onMessageListener } from "../firebase/messages";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const route = useNavigate();
  const token = Cookies.get("token");
  const isSubscribed = localStorage.getItem("isSubscribed");

  const [activeLink, setActiveLink] = useState("Home");
  const navigate = (url, active) => {
    route(url);
    setActiveLink(active);
  };
  const test = "";

  function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
  }

  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false);
  const [updateManager, setUpdateManager] = useState(false);

  const getManagers = async (jobType = [], locationType = []) => {
    if (token) {
      setLoadingManagers(true);
      try {
        const boatQuery = jobType.length !== 0 ? `jobTitle=${jobType}` : "";
        const locationQuery =
          locationType.length !== 0 ? `location=${locationType}` : "";
        const queryString = [boatQuery, locationQuery]
          .filter(Boolean)
          .join("&");
        const { data } = await axios.get(`/owner/manager?${queryString}`);

        setManagers(data?.data);
      } catch (err) {
      } finally {
        setLoadingManagers(false);
      }
    }
  };
  useEffect(() => {
    getManagers();
  }, [updateManager]);

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [updateEmployee, setUpdateEmployee] = useState(false);

  const getEmployees = async (jobType = [], locationType = []) => {
    if (token) {
      setLoadingEmployees(true);
      try {
        const boatQuery = jobType.length !== 0 ? `jobTitle=${jobType}` : "";
        const locationQuery =
          locationType.length !== 0 ? `location=${locationType}` : "";
        const queryString = [boatQuery, locationQuery]
          .filter(Boolean)
          .join("&");
        const { data } = await axios.get(`/owner/employees?${queryString}`);
        setEmployees(data?.data);
      } catch (err) {
      } finally {
        setLoadingEmployees(false);
      }
    }
  };
  useEffect(() => {
    getEmployees();
  }, [updateEmployee]);

  const [boats, setBoats] = useState([]);
  const [loadingBoats, setLoadingBoats] = useState(false);
  const [updateBoat, setUpdateBoat] = useState(false);

  const getBoats = async (boatType = "all", locationType = "all") => {
    if (token) {
      setLoadingBoats(true);
      try {
        const boatQuery = boatType !== "all" ? `boatType=${boatType}` : "";
        const locationQuery =
          locationType !== "all" ? `locationType=${locationType}` : "";
        const queryString = [boatQuery, locationQuery]
          .filter(Boolean)
          .join("&");
        const { data } = await axios.get(`/owner/boat?${queryString}`);

        setBoats(data?.data);
      } catch (err) {
      } finally {
        setLoadingBoats(false);
      }
    }
  };
  useEffect(() => {
    getBoats();
  }, [updateBoat]);

  const [dropDown, setDropDown] = useState([]);
  const [boatDropDown, setBoatDropDown] = useState([]);
  const [taskDropDown, setTaskDropDown] = useState([]);
  const [dropDownLoading, setDropDownLoading] = useState(false);

  const [updateDropDown, setUpdateDropDown] = useState(false);

  const getDropDown = async () => {
    if (token) {
      try {
        setDropDownLoading(true);
        const [companyResponse, boatResponse, taskResponse] = await Promise.all(
          [
            axios.get("/owner/dropdown/company"),
            axios.get("/owner/dropdown/boat"),
            axios.get("/owner/dropdown/task"),
          ]
        );
        if (
          taskResponse.status === 200 ||
          boatResponse.status === 200 ||
          companyResponse.status === 200
        ) {
          setDropDown(companyResponse?.data?.data);
          setBoatDropDown(boatResponse?.data?.data);
          setTaskDropDown(taskResponse?.data?.data);
        }
      } catch (err) {
        console.error("Error fetching dropdown data", err);
      } finally {
        setDropDownLoading(false);
      }
    }
  };
  useEffect(() => {
    getDropDown();
  }, [updateDropDown]);

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
      setNotifications((prev) => [...prev, prev.length + 1]);
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
        getDropDown,
        setUpdateEmployee,
        setUpdateManager,
        setUpdateBoat,
        setUpdateDropDown,
        dropDown,
        boatDropDown,
        taskDropDown,
        loadingBoats,
        loadingEmployees,
        setLoadingEmployees,
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
