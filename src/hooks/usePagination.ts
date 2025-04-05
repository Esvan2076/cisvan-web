import { useState } from "react";

function usePagination<T>(items: T[], pageSize: number) {
  const [index, setIndex] = useState(0);

  const paginated = items.slice(index, index + pageSize);

  const hasNextPage = index + pageSize < items.length;
  const hasPreviousPage = index > 0;

  const goToNextPage = () => {
    if (hasNextPage) setIndex(prev => prev + pageSize);
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) setIndex(prev => prev - pageSize);
  };

  return {
    paginated,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage
  };
}

export default usePagination;
