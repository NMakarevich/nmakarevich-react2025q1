import React, { Component } from 'react';
import Fallback from './components/fallback/fallback.tsx';

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.log(`Error boundary catch error: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      return <Fallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
