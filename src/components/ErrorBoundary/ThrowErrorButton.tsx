import { Component } from 'react';

type Props = Record<string, never>;

interface State {
  hasError: boolean;
}

class ThrowErrorButton extends Component<Props, State> {
  state = {
    hasError: false,
  };

  clickButtonError = () => {
    this.setState({ hasError: true });
  };

  componentDidUpdate() {
    if (this.state.hasError) {
      throw new Error('Oops!');
    }
  }
  render() {
    return <button onClick={this.clickButtonError}>ThrowError</button>;
  }
}

export default ThrowErrorButton;
