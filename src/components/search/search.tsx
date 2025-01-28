import { Component } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { API_URL, LOCAL_STORAGE_KEYS } from '../../constants.ts';
import Select from '../ui/select/select.tsx';
import './search.scss';
import { Response } from '../../interfaces.ts';

interface State {
  search: string;
  resources: Resource;
  selectedResource: string;
}

export interface Resource {
  [resource: string]: string;
}

interface Props {
  getResponse: (response: Response, status: number) => void;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const search = localStorage.getItem(LOCAL_STORAGE_KEYS.search) ?? '';
    const resource = localStorage.getItem(LOCAL_STORAGE_KEYS.resource) ?? '';
    this.state = {
      search: search,
      resources: {},
      selectedResource: resource,
    };
  }

  componentDidMount = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    const resources = Object.keys(data);
    this.setState({ resources: data });
    if (!this.state.selectedResource)
      this.setState({ selectedResource: resources[0] });
  };

  handleButtonClick = async () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.search, this.state.search);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.resource,
      this.state.selectedResource
    );
    const url = this.state.resources[this.state.selectedResource];
    const resp = await fetch(`${url}/?name=${this.state.search}`);
    const status = resp.status;
    const data: Response = await resp.json();
    this.props.getResponse(data, status);
  };

  selectResource = (resource: string) => {
    this.setState({ selectedResource: resource });
  };

  getInputValue = (value: string) => {
    this.setState({ search: value });
  };

  render() {
    return (
      <>
        <Select
          resources={Object.keys(this.state.resources)}
          handleSelected={this.selectResource}
        />
        <div className={'search'}>
          <Input
            name={'search'}
            id={'search'}
            type={'text'}
            search={this.state.search}
            searchValue={this.getInputValue}
          />
          <Button title="Search" handleClick={this.handleButtonClick} />
        </div>
      </>
    );
  }
}

export default Search;
