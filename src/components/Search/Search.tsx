import { useState, useEffect } from 'react';
import ThrowErrorButton from '../ErrorBoundary/ThrowErrorButton';
import './Search.css';

type SearchProps = {
  onSearchSubmit: (value: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearchSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('inputKey', inputValue);
    };

    const locStor = localStorage.getItem('inputKey');
    if (locStor) {
      setInputValue(locStor);
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    localStorage.setItem('inputKey', newValue);
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    onSearchSubmit(inputValue);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleClick}>
        <input
          type="text"
          placeholder="Product name"
          className="search__input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="search__button">
          Search
        </button>
      </form>
      <ThrowErrorButton />
    </div>
  );
};

export default Search;
