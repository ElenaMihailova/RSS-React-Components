import { PlanetInfo } from '../components/PlanetList/PlanetInfoTypes';
import { PageInfo } from '../components/Pagination/Pagination';

export const getAllData = async (url: string): Promise<PlanetInfo[]> => {
  let results: PlanetInfo[] = [];
  let fetchUrl = url;
  let shouldContinue = true;

  while (shouldContinue) {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    results = results.concat(data.results as PlanetInfo[]);
    if (data.next) {
      fetchUrl = data.next;
    } else {
      shouldContinue = false;
    }
  }
  console.log(results);
  return results;
};

export const fetchDataForPlanetList = async (
  searchQuery: string | null,
  page: number,
  setIsLoaded: (isLoaded: boolean) => void,
  setItems: (items: PlanetInfo[]) => void,
  setError: (error: Error) => void,
  setPageInfo: (info: PageInfo) => void
) => {
  const baseUrl = 'https://swapi.dev/api/planets/';
  const searchParam = searchQuery
    ? `search=${encodeURIComponent(searchQuery)}&`
    : '';
  const pageParam = searchQuery ? `page=1` : `page=${page}`;
  const url = `${baseUrl}?${searchParam}${pageParam}`;

  setIsLoaded(false);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setIsLoaded(true);
    setItems(data.results as PlanetInfo[]);
    setPageInfo({
      count: data.count,
      next: data.next,
      pages: Math.ceil(data.count / 10),
      prev: data.previous,
    });
  } catch (error) {
    setIsLoaded(true);
    setError(error as Error);
  }
};
