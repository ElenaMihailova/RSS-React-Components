import { Component } from 'react';
import './Search.css';

type SearchProps = {
  children?: JSX.Element;
  onSearchSubmit: (value: string) => void;
};

type SearchState = {
  inputValue: string;
  searchTerm: string;
};

export default class Search extends Component<SearchProps, SearchState> {
  inputValue: string;
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: '',
      searchTerm: 'search',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputValue = '';
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  };

  handleClick = () => {
    const { inputValue, searchTerm } = this.state;
    localStorage.setItem('inputKey', inputValue);
    this.props.onSearchSubmit(searchTerm);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Text"
          className="search__input"
          value={inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}
