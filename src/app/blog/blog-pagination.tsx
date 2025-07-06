"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type PaginationResult } from "@/lib/pagination";
import { generatePaginationItems } from "@/lib/generate-pagination-items";
import React from "react";

export default function BlogPagination({
  paginationInfo,
  currentLimit,
}: {
  paginationInfo: PaginationResult | undefined;
  currentLimit: number;
}) {
  return (
    paginationInfo &&
    paginationInfo.totalPages > 1 && (
      <div className="mt-10 select-none">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  paginationInfo.hasPreviousPage
                    ? `/blog/page/${paginationInfo.previousPage}/limit/${currentLimit}`
                    : undefined
                }
                aria-disabled={!paginationInfo.hasPreviousPage}
                disabled={!paginationInfo.hasPreviousPage}
                label={""}
              />
            </PaginationItem>

            {generatePaginationItems(
              paginationInfo.currentPage,
              paginationInfo.totalPages,
            ).map((item, index) => (
              <PaginationItem key={`${item}-${index}`}>
                {item === "ellipsis-start" || item === "ellipsis-end" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={`/blog/page/${item}/limit/${currentLimit}`}
                    isActive={item === paginationInfo.currentPage}
                    aria-disabled={item === paginationInfo.currentPage}
                    disabled={item === paginationInfo.currentPage}
                    className="border-none bg-transparent hover:bg-transparent"
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={
                  paginationInfo.hasNextPage
                    ? `/blog/page/${paginationInfo.nextPage}/limit/${currentLimit}`
                    : undefined
                }
                aria-disabled={!paginationInfo.hasNextPage}
                disabled={!paginationInfo.hasNextPage}
                label={""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  );
}
