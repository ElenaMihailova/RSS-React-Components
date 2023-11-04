import Loader from '../Loader/Loader';
import './PlanetList.css';
import NotFoundMessage from './NotFoundMessage';
import { PlanetInfo } from './PlanetInfoTypes';
import PlanetListGrid from './PlanetListGrid';

type PlanetListProps = {
  data: string;
  items: PlanetInfo[];
  isLoaded: boolean;
  error: Error | null;
};

const PlanetList: React.FC<PlanetListProps> = ({ items, isLoaded, error }) => {
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
    return <NotFoundMessage />;
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

  return <PlanetListGrid items={items} />;
};

export default PlanetList;
