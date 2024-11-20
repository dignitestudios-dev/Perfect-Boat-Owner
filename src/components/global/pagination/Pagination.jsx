import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-end items-center mt-4 w-full">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-xl transition-all duration-300 bg-[#199BD5] text-white text-[11px] ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#199BD3]"
        }`}
      >
        Previous
      </button>

      <span className="text-gray-500 w-20 ml-6">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-8 py-2 rounded-xl transition-all duration-300 bg-[#199BD1] text-white text-[11px] ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#199BD5]"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
