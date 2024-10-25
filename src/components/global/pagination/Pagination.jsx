import React, { useEffect, useState } from 'react';

const Pagination = ({page, totalPages, rowsPerPage, onPageChange, selectedFilter }) => {
  console.log("🚀 ~ Pagination ~ page:", page)
  
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber, rowsPerPage, selectedFilter);
  };

  useEffect(() => {
    // setActivePage(1);
  }, [totalPages, rowsPerPage]);

  const renderPageNumbers = () => {
    const pages = [];
    const maxPageButtons = 7; // Number of page buttons to display, including ellipses

    if (totalPages <= maxPageButtons) {
      // If total pages are less than or equal to maxPageButtons, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle 
              font-sans text-xs font-medium uppercase ${i === +page ? 'bg-[#03070b] text-white' : 'text-[#001229]'} 
              transition-all hover:bg-[#001229] hover:text-white active:bg-[#001229] disabled:pointer-events-none 
              disabled:opacity-50 disabled:shadow-none`}
            type="button"
            onClick={() => handlePageClick(i)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {i}
            </span>
          </button>
        );
      }
    } else {
      // Logic for ellipses
      const firstPage = 1;
      const lastPage = totalPages;
      const currentPage = +page;

      pages.push(
        <button
          key={firstPage}
          className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle 
            font-sans text-xs font-medium uppercase ${firstPage === currentPage ? 'bg-[#001229] text-white' : 'text-[#001229]'} 
            transition-all hover:bg-[#001229] hover:text-white active:bg-[#001229] disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none`}
          type="button"
          onClick={() => handlePageClick(firstPage)}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {firstPage}
          </span>
        </button>
      );

      if (currentPage > 4) {
        pages.push(<span key="left-ellipsis">...</span>);
      }

      const startPage = Math.max(currentPage - 2, 2);
      const endPage = Math.min(currentPage + 2, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle 
              font-sans text-xs font-medium uppercase ${i === currentPage ? 'bg-[#001229] text-white' : 'text-[#001229]'} 
              transition-all hover:bg-gray-500 hover:text-white active:bg-[#001229] disabled:pointer-events-none 
              disabled:opacity-50 disabled:shadow-none`}
            type="button"
            onClick={() => handlePageClick(i)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {i}
            </span>
          </button>
        );
      }

      if (currentPage < totalPages - 3) {
        pages.push(<span key="right-ellipsis">...</span>);
      }

      pages.push(
        <button
          key={lastPage}
          className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle 
            font-sans text-xs font-medium uppercase ${lastPage === currentPage ? 'bg-[#001229] text-white' : 'text-[#001229]'} 
            transition-all hover:bg-[#001229] hover:text-white active:bg-[#001229] disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none`}
          type="button"
          onClick={() => handlePageClick(lastPage)}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {lastPage}
          </span>
        </button>
      );
    }

    return pages;
  };


  return (
    <div className="flex items-center gap-4">
    <button
      disabled={+page === 1}
      className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase
       align-middle transition-all rounded-lg select-none hover:bg-gray-500 active:bg-gray-900/20 
       disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      onClick={() => handlePageClick(+page - 1)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        aria-hidden="true" className="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
      </svg>
      Previous
    </button>

    <div className="flex items-center gap-2">
      {renderPageNumbers()}
    </div>

    <button
      disabled={+page === totalPages}
      className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 
      uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-500 active:bg-gray-900/20
       disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      onClick={() => handlePageClick(+page + 1)}
    >
      Next
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        aria-hidden="true" className="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
      </svg>
    </button>
  </div>
  );
};

export default Pagination;
