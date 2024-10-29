import React, { useContext, useEffect, useState } from "react";
import BoatsTable from "../../components/fleet/BoatsTable";
import axios from "../../axios";
import Pagination from "../../components/global/pagination/Pagination";

const Boats = () => {
  const [boats, setBoats] = useState([]);
  const [loadingBoats, setLoadingBoats] = useState(false); 
  const [pageDetails, setPageDetails] = useState({})

  const getBoats = async ( pageNumber = 1, rows = 15 ) => {
    setLoadingBoats(true);
    try {
    //   const searchQuery = search ? `&search=${search}` : "";
    // const { data } = await axios.get(`/owner/boat?page=${pageNumber}&pageSize=${rows}${searchQuery}`);
      const { data } = await axios.get(`/owner/boat?page=${pageNumber}&pageSize=${rows}`);
      
      setBoats(data?.data?.data);
      setPageDetails(data?.data?.paginationDetails);
    } catch (err) {
    } finally {
      setLoadingBoats(false);
    }
  };

  useEffect(()=>{
    console.log("use effect call")
    getBoats()
  },[])

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <BoatsTable data={boats} loading={loadingBoats} />

      <div className="w-full flex justify-center pb-4">
            <Pagination
              page={pageDetails?.currentPage}
              totalPages={pageDetails?.totalPages}
              rowsPerPage={15}
              // selectedFilter={selectedFilter}
              onPageChange={getBoats}
            />
          </div>

    </div>
  );
};

export default Boats;
