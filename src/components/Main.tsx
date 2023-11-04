import { useState } from 'react';
import Search from './Search/Search';
import Result from './Result/Result';
import Universe from './Universe/Universe';
import './Main.css';

type Props = {
  children?: JSX.Element;
};

const Main: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('empty');

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="container">
      <div className="universe">
        <Universe />
      </div>
      <div className="search-result">
        {' '}
        <Search onSearchSubmit={updateSearchQuery} />
        <Result data={searchQuery} />
      </div>
    </div>
  );
};

export default Main;
