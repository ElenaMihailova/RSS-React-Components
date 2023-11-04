import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import './Result.css';

export interface PlanetInfo {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  population: string;
  terrain: string;
  surface_water: string;
}

type ResultsProps = {
  data?: string;
};

const Results: React.FC<ResultsProps> = ({ data }) => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<PlanetInfo[]>([]);

  const getAllData = async (url: string): Promise<PlanetInfo[]> => {
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

  const getData = () => {
    const storageKey = localStorage.getItem('inputKey');
    const baseUrl = 'https://swapi.dev/api/planets/';
    const searchParam = storageKey ? `?search=${storageKey}` : '';
    const url = baseUrl + searchParam;

    setIsLoaded(false);

    getAllData(url)
      .then((results) => {
        setIsLoaded(true);
        setItems(results);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  };

  useEffect(() => {
    getData();
  }, [data]);

  const renderPlanetDetails = (item: PlanetInfo) => {
    return (
      <div key={item.name} className="result__wrapper">
        <p>
          {' '}
          The planet called {item.name} is an amazing world, unique in its own
          way. This planet has an {item.climate} climate. The main type of
          terrain on {item.name} is {item.terrain}.
        </p>
        <p>
          {item.name} has a diameter of approximately {item.diameter}{' '}
          kilometres, which makes it quite impressive in size. The planet has a
          similar gravity to Earth and has a population of approximately{' '}
          {item.population}. These inhabitants experience days of{' '}
          {item.orbital_period} hours and the planet has an orbital period of{' '}
          {item.rotation_period} days.
        </p>
        <p>
          In terms of water resources, {item.surface_water} of the planet&apos;s
          surface is covered by water.
        </p>
        <p>
          {item.name} is also known for its impressive contribution to the film
          industry, having been the location for several films in the famous
          Star Wars series.
        </p>
      </div>
    );
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!isLoaded) {
    return <Loader />;
  }

  if (items.length === 0) {
    return (
      <>
        <p className="search__text">Nothing found</p>
      </>
    );
  }

  const storageKey = localStorage.getItem('inputKey');

  if (storageKey) {
    const trail = storageKey.trim().toLowerCase();
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(trail)
    );
    return (
      <div className="result">
        {filteredItems.map((item) => renderPlanetDetails(item))}
      </div>
    );
  }

  return (
    <div className="result result--all">
      {items.map((item) => (
        <div key={item.name} className="result__wrapper result__wrapper--all">
          <p>{`name: ${item.name}`}</p>
          <p>{`rotation_period: ${item.rotation_period} `}</p>
          <p>{`orbital_period: ${item.orbital_period}`}</p>
          <p> etc.</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
