import React, { useContext, useEffect, useState } from "react";
import EmployeesTableBig from "../../components/employees/EmployeesTableBig";
import axios from "../../axios";
import { GlobalContext } from "../../contexts/GlobalContext";

const Employees = () => {
  const {employees,loadingEmployees} = useContext(GlobalContext)
  

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <EmployeesTableBig data={employees} loading={loadingEmployees} />
    </div>
  );
};

export default Employees;
