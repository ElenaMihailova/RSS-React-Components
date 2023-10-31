import { Component } from 'react';
import Search from './Search/Search';
import Result from './Result/Result';
import Universe from './Universe/Universe';
import './Main.css';

type Props = {
  children?: JSX.Element;
};

type State = {
  searchQuery: string;
};

class Main extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      searchQuery: 'empty',
    };
  }

  updateSearchQuery = (value: string) => {
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <div className="container">
        <div className="universe">
          <Universe />
        </div>
        <div className="search-result">
          {' '}
          <Search onSearchSubmit={this.updateSearchQuery} />
          <Result data={this.state.searchQuery} />
        </div>
      </div>
    );
  }
}

export default Main;
