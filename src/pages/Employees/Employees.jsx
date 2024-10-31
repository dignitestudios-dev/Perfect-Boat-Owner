import React, { useContext, useEffect, useState } from "react";
import EmployeesTableBig from "../../components/employees/EmployeesTableBig";
import axios from "../../axios";
// import { GlobalContext } from "../../contexts/GlobalContext";
import Pagination from "../../components/global/pagination/Pagination";

const Employees = () => {
  // const {employees,loadingEmployees} = useContext(GlobalContext)

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false)
  const [pageDetails, setPageDetails] = useState({})
  
  const getEmployees = async (pageNumber = 1, rows = 15, jobTitle="all", locations="all") => {
    setLoadingEmployees(true);
    try {
      const jobQuery = jobTitle !== "all" ? `&jobTitle=${jobTitle}` : "";
      const locationQuery = locations !== "all" ? `&locations=${locations}` : "";
      const { data } = await axios.get(`/owner/employees?page=${pageNumber}&pageSize=${rows}${jobQuery}${locationQuery}`);
      setEmployees(data?.data?.data);
      setPageDetails(data?.data?.paginationDetails);
    } catch (err) {
    } finally {
      setLoadingEmployees(false);
    }
  };
  useEffect(()=>{
    getEmployees()
  },[])


  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <EmployeesTableBig data={employees} loading={loadingEmployees} getEmployees={getEmployees}/>

      <div className="w-full flex justify-center pb-4">
            <Pagination
              page={pageDetails?.currentPage}
              totalPages={pageDetails?.totalPages}
              rowsPerPage={15}
              // selectedFilter={selectedFilter}
              onPageChange={getEmployees}
            />
          </div>

    </div>
  );
};

export default Employees;
