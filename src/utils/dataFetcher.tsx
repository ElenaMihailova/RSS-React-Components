import { PlanetInfo } from '../components/PlanetList/PlanetInfoTypes';

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
  storageKey: string | null,
  setIsLoaded: (isLoaded: boolean) => void,
  setItems: (items: PlanetInfo[]) => void,
  setError: (error: Error) => void
) => {
  const baseUrl = 'https://swapi.dev/api/planets/';
  const searchParam = storageKey ? `?search=${storageKey}` : '';
  const url = baseUrl + searchParam;

  setIsLoaded(false);

  try {
    const results = await getAllData(url);
    setIsLoaded(true);
    setItems(results);
  } catch (error) {
    setIsLoaded(true);
    setError(error as Error);
  }
};
