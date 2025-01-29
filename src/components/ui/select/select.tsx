import { Component } from 'react';
import { API_URL, LOCAL_STORAGE_KEYS } from '../../../constants.ts';
import './select.scss';
import { Resource } from '../../search/search.tsx';

interface Props {
  getResources: (resource: Resource) => void;
  handleSelected: (value: string) => void;
}

interface State {
  resources: Resource;
  selected: string;
  isOpen: boolean;
}

class Select extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: '',
      isOpen: false,
      resources: {},
    };
  }

  async componentDidMount() {
    const res = await fetch(API_URL);
    const data: Resource = await res.json();
    const resources = Object.keys(data);
    this.setState({ resources: data });
    this.props.getResources(data);
    const resource = localStorage.getItem(LOCAL_STORAGE_KEYS.resource);
    if (resource) this.setState({ selected: resource });
    else {
      this.setState({ selected: resources[0] });
    }
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
    const { resources } = this.state;
    return (
      resources && (
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
              {Object.keys(resources).map((resource) => (
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
      )
    );
  }
}

export default Select;
