import { Component } from 'react';
import './Search.css';

type SearchProps = {
  children?: JSX.Element;
  onSearchSubmit: (value: string) => void;
};

type SearchState = {
  inputValue: string;
  searchTerm: number;
};

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: '',
      searchTerm: 1,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
    localStorage.setItem('inputKey', inputValue);
  };

  handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onSearchSubmit(this.state.inputValue);
    this.setState((prevState) => ({
      searchTerm: prevState.searchTerm + 1,
    }));
  };

  componentDidMount(): void {
    window.addEventListener('beforeunload', this.saveStateToLocalStorage);
    const locStor = localStorage.getItem('inputKey');
    if (locStor !== null) {
      this.setState({ inputValue: locStor });
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('beforeunload', this.saveStateToLocalStorage);
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem('inputKey', this.state.inputValue);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="search">
        <form className="search__form" onSubmit={this.handleClick}>
          <input
            type="text"
            placeholder="Planet name"
            className="search__input"
            value={inputValue}
            onChange={this.handleInputChange}
          />
          <button type="submit" className="search__button">
            Search
          </button>
        </form>
      </div>
    );
  }
}
