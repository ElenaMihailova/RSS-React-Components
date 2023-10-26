import { Component } from 'react';
import Search from './Search/Search';
import Result from './Result/Result';
import Universe from './Universe/universe';
import './Main.css';

type Props = {
  children?: JSX.Element;
};

type State = {
  search: string;
};

class Main extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      search: 'empty',
    };
  }

  updateData = (value: string) => {
    this.setState({ search: value });
  };

  render() {
    return (
      <div className="container">
        <div className="universe">
          <Universe />
        </div>
        <div className="search-result">
          {' '}
          <Search onSearchSubmit={this.updateData} />
          <Result data={this.state.search} />
        </div>
      </div>
    );
  }
}

export default Main;
