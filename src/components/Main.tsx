import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from './Search/Search';
import Universe from './Universe/Universe';
import './Main.css';
import Pagination, { PageInfo } from './Pagination/Pagination';
import { fetchDataForProductList } from '../utils/dataFetcher';
import { ProductInfo } from './PlanetList/ProductInfoTypes';
import ProductList from './PlanetList/ProductList';

type Props = {
  children?: JSX.Element;
};

const Main: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<ProductInfo[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    count: 0,
    pages: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const updateSearchQuery = useCallback(
    (value: string) => {
      setSearchQuery(value);
      fetchDataForProductList(
        value,
        1,
        itemsPerPage,
        setIsLoaded,
        setItems,
        setError,
        setPageInfo
      );
      setSearchParams({ page: '1' });
    },
    [
      itemsPerPage,
      setItems,
      setIsLoaded,
      setError,
      setPageInfo,
      setSearchParams,
    ]
  );

  const fetchDataForList = useCallback(
    (query: string, page: number, limit: number) => {
      fetchDataForProductList(
        query,
        page,
        limit,
        setIsLoaded,
        setItems,
        setError,
        setPageInfo
      );
    },
    []
  );

  useEffect(() => {
    fetchDataForList(searchQuery, currentPage, itemsPerPage);
  }, [searchQuery, currentPage, itemsPerPage, fetchDataForList]);

  const handleNavigate = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    fetchDataForList(searchQuery, 1, newItemsPerPage);
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
        <ProductList
          data={searchQuery}
          isLoaded={isLoaded}
          items={items}
          error={error}
        />
        <Pagination
          currentPage={currentPage}
          info={pageInfo}
          itemsPerPage={itemsPerPage}
          onNavigate={handleNavigate}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default Main;
