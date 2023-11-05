import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.css';

export interface PageInfo {
  count: number;
  pages: number;
}

interface PaginationProps {
  currentPage: number;
  info: PageInfo;
  itemsPerPage: number;
  onNavigate: (page: number) => void;
  onItemsPerPageChange: (number: number) => void;
}

const Pagination = ({
  currentPage,
  info,
  itemsPerPage,
  onNavigate,
  onItemsPerPageChange,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (page: number) => {
    onNavigate(page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    onItemsPerPageChange(newItemsPerPage);
    setPage(1);
  };

  return (
    <div className="pagination">
      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className="pagination__items-per-page"
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <button
        type="button"
        disabled={currentPage === 1}
        className="pagination__button pagination__button--prev"
        onClick={() => setPage(currentPage - 1)}
      >
        &lt;
      </button>
      <span className="pagination__page">{currentPage}</span>
      <button
        type="button"
        className="pagination__button pagination__button--next"
        disabled={currentPage === info.pages}
        onClick={() => setPage(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default React.memo(Pagination);
