import { Component } from 'react';

class ThrowErrorButton extends Component {
  handleClick = () => {
    throw new Error('Test error');
  };

  render() {
    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}

export default ThrowErrorButton;
