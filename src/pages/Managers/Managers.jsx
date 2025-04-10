import React, { useContext, useEffect, useState } from "react";
import ManagersTableBig from "../../components/managers/ManagersTableBig";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
// import { GlobalContext } from "../../contexts/GlobalContext";
import Pagination from "../../components/global/pagination/Pagination";

const Managers = () => {
  // const {managers, loadingManagers } = useContext(GlobalContext)
  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false);

  const [findSearch, setFindSearch] = useState("");
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const getManagers = async () => {
    setLoadingManagers(true);
    try {
      const searchText = findSearch ? `&search=${findSearch}` : "";
      const jobQuery = jobType.length !== 0 ? `&jobTitle=${jobType}` : "";
      const locationQuery =
        locationType.length !== 0 ? `&location=${locationType}` : "";
      // const { data } = await axios.get(
      //   `/owner/manager?page=${currentPage}&pageSize=15${searchText}${jobQuery}${locationQuery}`
      // );
      // setManagers(data?.data?.data);
      // setPageDetails(data?.data?.paginationDetails);
      // setTotalPages(data?.data?.paginationDetails?.totalPages);
      const { data } = await axios.get(`/owner/manager`);
      setManagers(data?.data);
    } catch (err) {
      console.log("🚀 ~ getManagers ~ err:", err);
    } finally {
      setLoadingManagers(false);
    }
  };
  useEffect(() => {
    getManagers();
  }, []);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <ManagersTableBig
        data={managers}
        loading={loadingManagers}
        getManagers={getManagers}
        locationType={locationType}
        setFindSearch={setFindSearch}
        setLocationType={setLocationType}
        jobType={jobType}
        setJobType={setJobType}
      />
    </div>
  );
};

export default Managers;
