import { Component } from 'react';
// import { Character, Episode, Location } from '../../interfaces.ts';
import ResultItem from '../result-item/result-item.tsx';
import './result-list.scss';
import { Response } from '../../interfaces.ts';
import ResponseError from '../response-error/response-error.tsx';
import Loading from '../ui/loading/loading.tsx';

interface State {
  response: Response;
  status: number;
  isLoading: boolean;
}

interface Props {
  requestUrl: string;
}

class ResultList extends Component<Props, State> {
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
        error: '',
      },
      status: 0,
      isLoading: false,
    };
  }

  async componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.requestUrl !== this.props.requestUrl) {
      this.setState({ isLoading: true });
      const resp = await fetch(this.props.requestUrl);
      const status = resp.status;
      const data: Response = await resp.json();
      this.setState({ response: data, status, isLoading: false });
    }
  }

  render() {
    const { results } = this.state.response;
    const { status, isLoading } = this.state;
    return (
      <div className={'result-list'}>
        {isLoading && <Loading />}
        {results &&
          results.length > 0 &&
          results.map((result) => (
            <ResultItem key={result.id} result={result} />
          ))}
        {status > 400 && (
          <ResponseError
            status={status}
            message={this.state.response.error || ''}
          />
        )}
      </div>
    );
  }
}

export default ResultList;
