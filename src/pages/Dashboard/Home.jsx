import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardTasksTable from "../../components/dashboard/DashboardTasksTable";
import NewTaskTable from "../../components/dashboard/NewTaskTable";
import DashboardBoats from "../../components/dashboard/DashboardBoats";
import ManagersTable from "../../components/dashboard/ManagersTable";
import EmployeeTable from "../../components/dashboard/EmployeeTable";
import axios from "../../axios";

const Home = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDashboardData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/owner/dashboard");
      setDashboardData(data?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <DashboardStats data={dashboardData?.dashboard} />
      <DashboardTasksTable data={dashboardData?.task} loading={loading}/>
      <NewTaskTable data={dashboardData?.taskRequest} loading={loading}/>
      <DashboardBoats data={dashboardData?.boat} loading={loading}/>
      <ManagersTable data={dashboardData?.manager} loading={loading}/>
      <EmployeeTable data={dashboardData?.employees} loading={loading}/>
    </div>
  );
};

export default Home;
