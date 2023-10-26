import { Component } from 'react';
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
  children?: JSX.Element;
  data?: string;
};

type ResultsState = {
  error: null | Error;
  isLoaded: boolean;
  items: Array<PlanetInfo>;
};

export default class Results extends Component<ResultsProps, ResultsState> {
  constructor(props: ResultsProps | Readonly<ResultsProps>) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  getData = () => {
    const storageKey = localStorage.getItem('inputKey');
    const url = storageKey
      ? `https://swapi.dev/api/planets/?search=${storageKey}`
      : 'https://swapi.dev/api/planets/';

    this.setState({ isLoaded: false });

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentDidMount(): void {
    this.getData();
  }

  componentDidUpdate(prevProps: ResultsProps): void {
    if (this.props.data !== prevProps.data) {
      this.getData();
    }
  }

  renderPlanetDetails(item: PlanetInfo) {
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
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    if (!isLoaded) {
      return <Loader />;
    }

    if (items.length === 0) {
      return <>Nothing found</>;
    }

    const storageKey = localStorage.getItem('inputKey');

    if (storageKey) {
      const trail = storageKey.trim().toLowerCase();
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(trail)
      );
      return (
        <div className="result">
          {filteredItems.map(this.renderPlanetDetails)}
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
            {/* <p>{`diameter: ${item.diameter}`}</p>
            <p>{`climate: ${item.climate}`}</p>
            <p>{`gravity: ${item.gravity}`}</p>
            <p>{`population: ${item.population}`}</p>
            <p>{`terrain: ${item.terrain}`}</p>
            <p>{`surface_water: ${item.surface_water}`}</p> */}
          </div>
        ))}
      </div>
    );
  }
}
