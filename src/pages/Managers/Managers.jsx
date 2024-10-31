import React, { useContext, useEffect, useState } from "react";
import ManagersTableBig from "../../components/managers/ManagersTableBig";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
// import { GlobalContext } from "../../contexts/GlobalContext";
import Pagination from "../../components/global/pagination/Pagination";

const Managers = () => {
  // const {managers, loadingManagers } = useContext(GlobalContext)
  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false)
  const [pageDetails, setPageDetails] = useState({})

  const getManagers = async (pageNumber = 1, rows = 15, jobTitle="all", locations="all") => {
    setLoadingManagers(true);
    try {
      const jobQuery = jobTitle !== "all" ? `&jobTitle=${jobTitle}` : "";
      const locationQuery = locations !== "all" ? `&location=${locations}` : "";
      const { data } = await axios.get(`/owner/manager?page=${pageNumber}&pageSize=${rows}${jobQuery}${locationQuery}`);
      setManagers(data?.data?.data);
      setPageDetails(data?.data?.paginationDetails)
    } catch (err) {
      
    } finally {
      setLoadingManagers(false);
    }
  };
  useEffect(()=>{
    getManagers()
  },[])

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <ManagersTableBig data={managers} loading={loadingManagers} getManagers={getManagers}/>
      <div className="w-full flex justify-center pb-4">
            <Pagination
              page={pageDetails?.currentPage}
              totalPages={pageDetails?.totalPages}
              rowsPerPage={15}
              // selectedFilter={selectedFilter}
              onPageChange={getManagers}
            />
          </div>
    </div>
  );
};

export default Managers;
