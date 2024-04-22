import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationsProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Paginations: React.FC<PaginationsProps> = ({
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / 5);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageClick(currentPage - 1)}
              isActive={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                href="#"
                isActive={index + 1 === currentPage}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageClick(currentPage + 1)}
              isActive={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
