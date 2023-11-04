import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.css';

export interface PageInfo {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

interface PaginationProps {
  currentPage: number;
  info: PageInfo;
  onNavigate: (page: number) => void;
  isEmpty: boolean;
}

const Pagination = ({
  currentPage,
  info,
  onNavigate,
  isEmpty,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (page: number) => {
    onNavigate(page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={currentPage === 1 || isEmpty}
        className="pagination__button pagination__button--prev"
        onClick={() => setPage(currentPage - 1)}
      >
        &lt;
      </button>
      <span className="pagination__page"> {currentPage}</span>
      <button
        type="button"
        className="pagination__button pagination__button--next"
        disabled={currentPage === info.pages || isEmpty}
        onClick={() => setPage(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default React.memo(Pagination);
