import { Component } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { LOCAL_STORAGE_KEYS } from '../../constants.ts';
import Select from '../ui/select/select.tsx';
import './search.scss';

interface State {
  search: string;
  resources: Resource;
  selectedResource: string;
}

export interface Resource {
  [resource: string]: string;
}

interface Props {
  getRequestUrl: (requestUrl: string) => void;
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

  handleButtonClick = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.search, this.state.search);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.resource,
      this.state.selectedResource
    );
    const url = this.state.resources[this.state.selectedResource];
    this.props.getRequestUrl(`${url}/?name=${this.state.search}`);
  };

  selectResource = (resource: string) => {
    this.setState({ selectedResource: resource });
  };

  getInputValue = (value: string) => {
    this.setState({ search: value });
  };

  getResources = (resources: Resource) => {
    if (!this.state.selectedResource)
      this.setState({ selectedResource: Object.keys(resources)[0] });
    this.setState({ resources });
  };

  render() {
    return (
      <>
        <Select
          getResources={this.getResources}
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
