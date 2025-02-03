import React, { Component } from 'react';
import './input.scss';

interface Props {
  type?: string;
  id: string;
  name: string;
  search: string;
  list?: string;
  searchValue: (value: string) => void;
}

interface State {
  inputValue: string;
}

class Input extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  componentDidMount() {
    this.setState({ inputValue: this.props.search });
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    this.setState({ inputValue: target.value });
    this.props.searchValue(target.value);
  };

  render() {
    const { type, name, id } = this.props;
    return (
      <input
        className={'input'}
        type={type}
        name={name}
        id={id}
        value={this.state.inputValue}
        onChange={this.onChange}
      />
    );
  }
}

export default Input;
