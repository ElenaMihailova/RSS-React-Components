import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from './Search/Search';
import Result from './Result/Result';
import Universe from './Universe/Universe';
import './Main.css';
import Pagination, { PageInfo } from './Pagination/Pagination';

type Props = {
  children?: JSX.Element;
};

const Main: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('empty');

  const [pageInfo] = useState<PageInfo>({
    count: 0,
    next: null,
    pages: 0,
    prev: null,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  useEffect(() => {}, [currentPage]);

  const handleNavigate = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="container">
      <div className="universe">
        <Universe />
      </div>
      <div className="search-result">
        {' '}
        <Search onSearchSubmit={updateSearchQuery} />
        <Result data={searchQuery} />
        <Pagination
          currentPage={currentPage}
          info={pageInfo}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
};

export default Main;
