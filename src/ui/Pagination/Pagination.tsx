import { useState } from "react";
import PageItem from "./PageItem";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [page, setPage] = useState(1);

  const lastPage = totalPages;
  const pageRange = Array.from({ length: lastPage - 2 }, (_, i) => i + 2);

  const goNextPage = () => {
    if (page === lastPage) return;
    setPage(page + 1);
  };

  const goPrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const goToPage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="flex justify-center items-center">
      <ul className="flex justify-center items-center gap-6">
        {/* this is the previous li element */}
        <li className={"rounded-md cursor-pointer"} onClick={goPrevPage}>
          <img src="/public/icons/back_arrow.svg" alt="previous page" />
        </li>
        {/* this is the first page li element */}
        <li
          className={`px-4 py-2 rounded-md cursor-pointer ${
            page === 1 ? "bg-[#44316e]" : "bg-[#0f0f0f]"
          }`}
          onClick={() => goToPage(1)}
        >
          {1}
        </li>

        {pageRange.map((pageNumber) => {
          return (
            <PageItem
              pageNumber={pageNumber}
              currentPage={page}
              onPageChange={goToPage}
            >
              {pageNumber}
            </PageItem>
          );
        })}

        {/* this is the last page li element */}
        <li
          className={`px-4 py-2 rounded-md cursor-pointer ${
            page === lastPage ? "bg-[#44316e]" : "bg-[#0f0f0f]"
          }`}
          onClick={() => goToPage(lastPage)}
        >
          {lastPage}
        </li>

        {/* this is the next li element */}

        <li className={"rounded-md cursor-pointer "} onClick={goNextPage}>
          <img src="/public/icons/front_arrow.svg" alt="next page" />
        </li>
      </ul>
    </div>
  );
}
