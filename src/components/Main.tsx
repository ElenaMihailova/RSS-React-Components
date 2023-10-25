import { Component } from 'react';
import Search from './Search/Search';
import Result from './Result/Result';

class Main extends Component {
  render() {
    return (
      <div>
        <Search />
        <Result />
      </div>
    );
  }
}

export default Main;
