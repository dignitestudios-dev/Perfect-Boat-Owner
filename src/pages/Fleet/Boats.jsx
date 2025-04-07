import React, { useContext, useEffect, useState } from "react";
import BoatsTable from "../../components/fleet/BoatsTable";
import axios from "../../axios";
import Pagination from "../../components/global/pagination/Pagination";

const Boats = () => {
  const [boats, setBoats] = useState([]);
  const [loadingBoats, setLoadingBoats] = useState(false);
  const [pageDetails, setPageDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [findSearch, setFindSearch] = useState("");
  const [locationType, setLocationType] = useState([]);
  const [boatType, setBoatType] = useState([]);

  const getBoats = async () => {
    setLoadingBoats(true);
    try {
      const searchText = findSearch ? `&search=${findSearch}` : "";
      const boatQuery = boatType.length !== 0 ? `&boatType=${boatType}` : "";
      const locationQuery =
        locationType.length !== 0 ? `&locationType=${locationType}` : "";
      const { data } = await axios.get(
        `/owner/boat?page=${currentPage}&pageSize=15${boatQuery}${locationQuery}${searchText}`
      );
      // const { data } = await axios.get(`/owner/boat?page=${pageNumber}&pageSize=${rows}`);

      setBoats(data?.data?.data);
      setPageDetails(data?.data?.paginationDetails || []);
      setTotalPages(data?.data?.paginationDetails?.totalPages);
    } catch (err) {
      console.log("🚀 ~ getBoats ~ err:", err);
    } finally {
      setLoadingBoats(false);
    }
  };

  useEffect(() => {
    getBoats();
  }, [currentPage, findSearch, boatType, locationType]);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <BoatsTable
        pageDetails={pageDetails}
        data={boats}
        loading={loadingBoats}
        boatType={boatType}
        locationType={locationType}
        setFindSearch={setFindSearch}
        setLocationType={setLocationType}
        setBoatType={setBoatType}
      />

      <div className="w-full flex justify-center pb-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>
    </div>
  );
};

export default Boats;
