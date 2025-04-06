import { useState } from "react";

export const usePagination = <T>(
  items: T[],
  pageSize: number,
  initialIndex: number = 0
) => {
  const initialPage = Math.floor(initialIndex / pageSize);
  const [page, setPage] = useState(initialPage);

  const startIndex = page * pageSize;
  const paginated = items.slice(startIndex, startIndex + pageSize);

  const hasNextPage = startIndex + pageSize < items.length;
  const hasPreviousPage = page > 0;

  const goToNextPage = () => {
    if (hasNextPage) setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) setPage(page - 1);
  };

  return {
    paginated,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    page,
    setPage,
  };
};
