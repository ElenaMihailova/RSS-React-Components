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
    console.log('Полученные данные:', data);
    results = results.concat(data.results as PlanetInfo[]);
    if (data.next) {
      fetchUrl = data.next;
    } else {
      shouldContinue = false;
    }
  }
  return results;
};

export const fetchDataForPlanetList = async (
  searchQuery: string | null,
  setIsLoaded: (isLoaded: boolean) => void,
  setItems: (items: PlanetInfo[]) => void,
  setError: (error: Error) => void,
  setPageInfo: (info: PageInfo) => void,
  itemsPerPage: number
) => {
  const baseUrl = 'https://swapi.dev/api/planets/';
  const searchParam = searchQuery
    ? `search=${encodeURIComponent(searchQuery)}&`
    : '';

  setIsLoaded(false);

  try {
    const allData = await getAllData(`${baseUrl}?${searchParam}`);
    setIsLoaded(true);
    setItems(allData);
    setPageInfo({
      count: allData.length,
      pages: Math.ceil(allData.length / itemsPerPage),
    });
  } catch (error) {
    setIsLoaded(true);
    setError(error as Error);
  }
};
