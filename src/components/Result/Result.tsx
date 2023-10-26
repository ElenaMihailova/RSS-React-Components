import { Component } from 'react';
import Loader from '../Loader/Loader';

export interface People {
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

type Props = {
  children?: JSX.Element;
  data?: string;
};

type State = {
  error: null | Error;
  isLoaded: boolean;
  items: Array<People>;
};

export default class Results extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount(): void {
    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
          console.log(result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const storageKey = localStorage.getItem('inputKey');
    if (error) {
      return <p>Error: {error.message}</p>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      if (storageKey !== null) {
        const trail = storageKey.trim().toLowerCase();
        const results = items.filter((item) =>
          item.name.toLowerCase().includes(trail)
        );

        const content =
          results.length > 0 ? (
            <>
              {console.log(results)}

              {results.map((item) => {
                return (
                  <div key={item.name}>
                    <p>
                      {' '}
                      The planet called {item.name} is an amazing world, unique
                      in its own way. This planet has an {item.climate} climate.
                      The main type of terrain on {item.name} is {item.terrain}.
                    </p>
                    <p>
                      {item.name} has a diameter of approximately{' '}
                      {item.diameter} kilometres, which makes it quite
                      impressive in size. The planet has a similar gravity to
                      Earth and has a population of approximately{' '}
                      {item.population}. These inhabitants experience days of{' '}
                      {item.orbital_period} hours and the planet has an orbital
                      period of {item.rotation_period} days.
                    </p>
                    <p>
                      In terms of water resources, {item.surface_water} of the
                      planet&apos;s surface is covered by water.
                    </p>
                    <p>
                      {item.name} is also known for its impressive contribution
                      to the film industry, having been the location for several
                      films in the famous Star Wars series.
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <>Nothing found</>
          );

        return content;
      } else {
        return (
          <ul>
            {items.map((item) => (
              <li
                key={item.name}
              >{`${item.name}, ${item.rotation_period}, ${item.orbital_period}, ${item.diameter}`}</li>
            ))}
          </ul>
        );
      }
    }
  }
}
