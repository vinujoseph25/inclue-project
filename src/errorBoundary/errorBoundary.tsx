import React from 'react';
import './errorBoundary.scss';
import intl from 'react-intl-universal';
import en_us from '../locales/en-US.json';
import { getRuntimeConfig } from 'helpers';
import { useAzureAppConfig } from 'contexts/AzureAppConfigProvider';

export const ErrorBoundary: React.FC = (props) => {
  const devErrorMode = useAzureAppConfig('DevErrorMode') === 'true';
  return <ErrorBoundaryClass {...{ devErrorMode }}>{props.children}</ErrorBoundaryClass>;
};

interface ErrorBoundaryClassState {
  error?: Error;
}

interface ErrorBoundaryClassProps {
  devErrorMode: boolean; //Are we in a pre-preoduction environment? If so, we can show the stack trace.
}

const defaultState: ErrorBoundaryClassState = {};

class ErrorBoundaryClass extends React.Component<ErrorBoundaryClassProps, ErrorBoundaryClassState> {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  get hasError() {
    return this.state.error != null;
  }
  componentDidCatch(error, errorInfo) {
    // Can also log the error to an error reporting service here
  }

  render() {
    if (this.hasError) {
      return <ErrorNotice error={this.state.error} devErrorMode={this.props.devErrorMode} />;
    }

    return this.props.children;
  }
}

interface ErrorNoticeProps {
  error?: Error;
  devErrorMode: boolean;
}

const ErrorNotice: React.FC<ErrorNoticeProps> = (props) => {
  const supportEmail = React.useMemo(() => getRuntimeConfig().supportEmail, []);

  //if the locale is not loaded just default to en-US
  const header = intlWithFallback('errorBoundary.header', en_us.errorBoundary.header);
  const nextSteps = intlWithFallback('errorBoundary.nextSteps', en_us.errorBoundary.nextSteps);
  const support = `${intlWithFallback('errorBoundary.support', en_us.errorBoundary.support)} ${supportEmail}.`;

  return (
    <div className="errorNotice">
      <h1>{header}</h1>
      <span>{nextSteps}</span>
      <span>{support}</span>
      <StackTrace {...props} />
    </div>
  );
};

const ErrorLine: React.FC<{ line: string; i: number }> = (props) => {
  const { line, i } = props;
  const key = `errorLine${i}`;
  if (i === 0)
    return (
      <b className="error" key={key}>
        {line}
      </b>
    );

  return <span key={key}>{line.replace(/^\s*at/g, '--- at')}</span>;
};

const StackTrace: React.FC<ErrorNoticeProps> = (props) => {
  if (!props.devErrorMode) return <React.Fragment />;

  return (
    <React.Fragment>
      <br />
      {JSON.stringify(props.error!.stack, null, 2)
        .replace('"', '')
        .split('\\n')
        .map((line, i) => (
          <ErrorLine {...{ line, i }} />
        ))}
    </React.Fragment>
  );
};

function intlWithFallback(intlString: string, fallback: string) {
  let intlText = intl.get(intlString);
  return intlText !== '' ? intlText : fallback;
}
