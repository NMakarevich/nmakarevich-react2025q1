import './App.scss';
import { Component } from 'react';
import Search from './components/search/search.tsx';
import { Response } from './interfaces.ts';
import ResultList from './components/result-list/result-list.tsx';

interface State {
  response: Response;
  status: number;
}

type Props = object;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      response: {
        results: [],
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
      },
      status: 0,
    };
  }

  getResponse = (response: Response, status: number) => {
    this.setState({ response, status });
  };

  render() {
    return (
      <>
        <header className="app-header">
          <div className="container">
            <Search getResponse={this.getResponse} />
          </div>
        </header>
        <main className="app-main">
          <div className="container">
            <ResultList results={this.state.response.results} />
          </div>
        </main>
        <footer className="footer">
          <div className="container"></div>
        </footer>
      </>
    );
  }
}

export default App;
