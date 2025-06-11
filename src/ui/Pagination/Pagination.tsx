import PageItem from "./PageItem";
import rangeArray from "../../core/utils/range.utils";


interface PaginationProps {
  page: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToNextPage: (page: number) => void;
  goToPrevPage: (page: number) => void;
  
}
export default function Pagination({ page, totalPages, goToPage, goToNextPage, goToPrevPage }: PaginationProps) {


  const computePageNumbers = () => {
    const DOTS = "DOTS";
    const totalPageCount = totalPages;
    const currentPage = page;
    const pageNeighbours = 1;

    /* this variable stores the total page numbers that will be visible
       to the user for navigation, this includes:
       1. the first page.
       2. the last page.
       3. the page in the middle
       4. the neighbouring page from the middle
    */
    const totalNumbers = pageNeighbours * 2 + 3;

    // this includes the number of li elements to display
    // I add 2 here because im including the next and prev li elements as well
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(
        totalPageCount - 1,
        currentPage + pageNeighbours
      );
      let pages: (number | "DOTS")[] = rangeArray(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      console.log(
        totalNumbers,
        totalBlocks,
        startPage,
        endPage,
        hasLeftSpill,
        hasRightSpill,
        spillOffset
      );

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = rangeArray(startPage - spillOffset, startPage - 1);
          console.log(extraPages);

          pages = [DOTS, ...extraPages, ...pages];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = rangeArray(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, DOTS];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [DOTS, ...pages, DOTS];
          break;
        }
      }

      return [1, ...pages, totalPages];
    } else {
      return rangeArray(1, totalPageCount);
    }
  };

  const pageRange = computePageNumbers();


  return (
    <div className="flex justify-center items-center">
      <ul className="flex justify-center items-center gap-6">
        {/* this is the previous li element */}
        <li className={"rounded-md cursor-pointer"} onClick={()  => goToPrevPage(page)}>
          <img src="/public/icons/back_arrow.svg" alt="previous page" />
        </li>

        {pageRange.map((pageNumber, index) => {
          if (pageNumber === "DOTS") {
            return (
              <li
                key={index}
                className="tracking-[6px] rounded-md cursor-pointer text-xl"
              >
                ...
              </li>
            );
          } else {
            return (
              <PageItem 
                key={pageNumber}
                pageNumber={pageNumber}
                currentPage={page}
                onPageChange={goToPage}
              >
                {pageNumber}
              </PageItem>
            );
          }
        })}
        {/* this is the next li element */}
        <li className={"rounded-md cursor-pointer "} onClick={() => goToNextPage(page)}>
          <img src="/public/icons/front_arrow.svg" alt="next page" />
        </li>
      </ul>
    </div>
  );
}
