import React from "react";
import DeactivatedEmployeesTable from "../../components/employees/DeactivatedEmployeesTable";

const DeactivatedEmployees = () => {
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <DeactivatedEmployeesTable />
    </div>
  );
};

export default DeactivatedEmployees;
