import { Component } from 'react';
import { LOCAL_STORAGE_KEYS } from '../../../constants.ts';
import './select.scss';

interface Props {
  resources: string[];
  handleSelected: (value: string) => void;
}

interface State {
  selected: string;
  isOpen: boolean;
}

class Select extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: '',
      isOpen: false,
    };
  }

  componentDidMount() {
    const resource = localStorage.getItem(LOCAL_STORAGE_KEYS.resource);
    if (resource) this.setState({ selected: resource });
  }

  handleSelect = (value: string) => {
    this.setState({ selected: value });
    this.props.handleSelected(value);
    this.setState({ isOpen: false });
  };

  toggleSelect = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { resources } = this.props;
    return (
      <>
        <div className={'select'}>
          <span className={'select-label'}>Select resource: </span>
          <div className={'select-list'}>
            <span
              className={`select-value ${this.state.isOpen ? 'open' : ''}`}
              onClick={this.toggleSelect}
            >
              {this.state.selected}
            </span>
            <ul className={`select-options ${this.state.isOpen ? 'open' : ''}`}>
              {resources.map((resource) => (
                <li
                  key={resource}
                  className={'select-option'}
                  onClick={() => this.handleSelect(resource)}
                >
                  {resource}
                </li>
              ))}
            </ul>
            {this.state.isOpen && (
              <div
                className={'select-overlay'}
                onClick={this.toggleSelect}
              ></div>
            )}
          </div>
        </div>

        {/*<select*/}
        {/*  id={id}*/}
        {/*  onChange={this.handleSelect}*/}
        {/*  value={this.state.selected ? this.state.selected : ''}*/}
        {/*  onClick={() => console.log('check')}*/}
        {/*>*/}
        {/*  {resources.map((resource) => (*/}
        {/*    <option key={resource} value={resource}>*/}
        {/*      {resource}*/}
        {/*    </option>*/}
        {/*  ))}*/}
        {/*</select>*/}
      </>
    );
  }
}

export default Select;
