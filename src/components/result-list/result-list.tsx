import { Component } from 'react';
import ResultItem from '../result-item/result-item.tsx';
import './result-list.scss';
import { Character, Response } from '../../interfaces.ts';
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
      if (!data.error && 'image' in data.results[0] && data.results[0].image) {
        const images = data.results.map((item) => (item as Character).image);
        const promises = images.map((image) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = image;
            img.alt = image;
            img.onload = () => resolve(img);
            img.onerror = () => reject();
          });
        });
        await Promise.all(promises);
      }
      this.setState({ response: data, status, isLoading: false });
    }
  }

  render() {
    const { results } = this.state.response;
    const { status, isLoading } = this.state;
    return (
      <>
        {isLoading && <Loading />}
        {status > 400 && (
          <ResponseError
            status={status}
            message={this.state.response.error || ''}
          />
        )}
        {results && results.length > 0 && (
          <div className={'result'}>
            <div className={'result-list'}>
              {results.map((result) => (
                <ResultItem key={result.id} result={result} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ResultList;
