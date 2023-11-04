import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from './Search/Search';
import PlanetList from './PlanetList/PlanetList';
import Universe from './Universe/Universe';
import './Main.css';
import Pagination, { PageInfo } from './Pagination/Pagination';
import { fetchDataForPlanetList } from '../utils/dataFetcher';
import { PlanetInfo } from './PlanetList/PlanetInfoTypes';

type Props = {
  children?: JSX.Element;
};

const Main: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<PlanetInfo[]>([]);
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
    fetchDataForList(value);
  };

  const fetchDataForList = (query: string) => {
    fetchDataForPlanetList(query, setIsLoaded, setItems, setError);
  };

  useEffect(() => {
    fetchDataForList(searchQuery);
  }, [currentPage, searchQuery]);

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
        <PlanetList
          data={searchQuery}
          isLoaded={isLoaded}
          items={items}
          error={error}
        />
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
