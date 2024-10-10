import React, { useEffect, useState } from "react";
import ManagersTableBig from "../../components/managers/ManagersTableBig";
import axios from "../../axios";

const Managers = () => {
  const [managerData, setManagerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state

  const getManagers = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const { data } = await axios.get("/owner/manager");
      console.log("🚀 ~ getManagers ~ data:", data);
      setManagerData(data?.data);
    } catch (err) {
      console.error("Error fetching manager data:", err);
      setError("Failed to fetch managers. Please try again later."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getManagers();
  }, []);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <ManagersTableBig data={managerData} loading={loading} />
    </div>
  );
};

export default Managers;
