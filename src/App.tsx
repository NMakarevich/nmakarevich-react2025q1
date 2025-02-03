import './App.scss';
import { Component } from 'react';
import Search from './components/search/search.tsx';
import ResultList from './components/result-list/result-list.tsx';
import Button from './components/ui/button/button.tsx';

interface State {
  error: boolean;
  requestUrl: string;
}

type Props = object;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: false,
      requestUrl: '',
    };
  }

  throwError = () => {
    this.setState({ error: true });
  };

  getRequestUrl = (requestUrl: string) => {
    this.setState({ requestUrl });
  };

  render() {
    if (this.state.error) throw new Error('Test error boundary');
    return (
      <>
        <header className="app-header">
          <div className="container">
            <Search getRequestUrl={this.getRequestUrl} />
            <div className={'error-button'}>
              <Button title={'Error Test'} handleClick={this.throwError} />
            </div>
          </div>
        </header>
        <main className="app-main">
          <div className="container">
            <ResultList requestUrl={this.state.requestUrl} />
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
