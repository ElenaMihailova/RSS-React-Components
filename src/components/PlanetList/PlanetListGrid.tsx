import { PlanetInfo } from './PlanetInfoTypes';

type PlanetListDisplayProps = {
  items: PlanetInfo[];
};

const PlanetListGrid: React.FC<PlanetListDisplayProps> = ({ items }) => {
  return (
    <div className="result result--all">
      {items.map((item) => (
        <div key={item.name} className="result__wrapper result__wrapper--all">
          <p>{`Name: ${item.name}`}</p>
          <p>{`Rotation Period: ${item.rotation_period}`}</p>
          <p>{`Orbital Period: ${item.orbital_period}`}</p>
          <p>etc.</p>
        </div>
      ))}
    </div>
  );
};

export default PlanetListGrid;
