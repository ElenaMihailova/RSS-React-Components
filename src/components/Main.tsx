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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<PlanetInfo[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentItems, setCurrentItems] = useState<PlanetInfo[]>([]);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    count: 0,
    pages: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
    fetchDataForList(value);
    setSearchParams({ page: '1' });
  };

  const fetchDataForList = (query: string) => {
    fetchDataForPlanetList(
      query,
      setIsLoaded,
      setItems,
      setError,
      setPageInfo,
      itemsPerPage
    );
  };

  const isEmpty = items.length === 0;

  useEffect(() => {
    fetchDataForList(searchQuery);
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = items.slice(start, end);
    setCurrentItems(currentItems);
  }, [items, currentPage, itemsPerPage]);

  const handleNavigate = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    fetchDataForList(searchQuery);
    setSearchParams({ page: '1' });
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
          items={currentItems}
          error={error}
        />
        {isLoaded && !isEmpty && (
          <Pagination
            currentPage={currentPage}
            info={pageInfo}
            itemsPerPage={itemsPerPage}
            onNavigate={handleNavigate}
            onItemsPerPageChange={handleItemsPerPageChange}
            isEmpty={isEmpty}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
