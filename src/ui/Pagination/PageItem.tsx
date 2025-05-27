import React from "react";

interface PageItemProps {
  pageNumber: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
}

export default function PageItem({
  pageNumber,
  currentPage,
  onPageChange,
  children,
}: PageItemProps) {
  return (
    <li
      key={pageNumber}
      className={`px-4 py-2 rounded-md cursor-pointer ${
        currentPage === pageNumber ? "bg-[#44316e]" : "bg-[#0f0f0f]"
      }`}
      onClick={() => onPageChange(pageNumber)}
    >
      {children}
    </li>
  );
}
