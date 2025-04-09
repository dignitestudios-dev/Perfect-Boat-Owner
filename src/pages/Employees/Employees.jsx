import React, { useContext, useEffect, useState } from "react";
import EmployeesTableBig from "../../components/employees/EmployeesTableBig";
import axios from "../../axios";
// import { GlobalContext } from "../../contexts/GlobalContext";
import Pagination from "../../components/global/pagination/Pagination";

const Employees = () => {
  // const {employees,loadingEmployees} = useContext(GlobalContext)

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [findSearch, setFindSearch] = useState("");
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const getEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const searchText = findSearch ? `&search=${findSearch}` : "";
      const jobQuery = jobType.length !== 0 ? `&jobTitle=${jobType}` : "";
      const locationQuery =
        locationType.length !== 0 ? `&location=${locationType}` : "";
      // const { data } = await axios.get(
      //   `/owner/employees?page=${currentPage}&pageSize=15${searchText}${jobQuery}${locationQuery}`
      // );
      const { data } = await axios.get(`/owner/employees`);
      setEmployees(data?.data);
      // setPageDetails(data?.data?.paginationDetails);
      // setTotalPages(data?.data?.paginationDetails?.totalPages);
    } catch (err) {
      console.log("🚀 ~ getEmployees ~ err:", err);
    } finally {
      setLoadingEmployees(false);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <EmployeesTableBig
        data={employees}
        loading={loadingEmployees}
        getEmployees={getEmployees}
        locationType={locationType}
        setFindSearch={setFindSearch}
        setLocationType={setLocationType}
        jobType={jobType}
        setJobType={setJobType}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Employees;
