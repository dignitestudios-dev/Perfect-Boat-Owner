import React, { useEffect, useState } from "react";
import EmployeesTableBig from "../../components/employees/EmployeesTableBig";
import axios from "../../axios";

const Employees = () => {

  const [EmployeeData, setEmployeeData] = useState([])
  console.log("🚀 ~ Boats ~ boatsData:", EmployeeData)
  const [loading, setLoading] = useState(false)

  const getEmployees = async () => {
    try {
      setLoading(true);
      
      const { data } = await axios.get("/owner/employees");
      console.log("🚀 ~ getemployees ~ data:", data)
      setEmployeeData(data?.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getEmployees()
  },[])

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <EmployeesTableBig data={EmployeeData} loading={loading} />
    </div>
  );
};

export default Employees;
