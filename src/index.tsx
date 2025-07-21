import React, { FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';

//import Notifications from 'src/utils/Notifications';
import I18N from './i18n';
import createMyTheme from 'library/createMyTheme';

import './styles/index.scss';


import { ErrorBoundary } from 'errorBoundary/errorBoundary';
import { s } from 'react-router-dom';
// import browserPatches from 'src/helpers/browserPatches';
import Routes from './routes/Routes';
import Layout from 'layout';

// attempt at addressing cache issue
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.unregister();
  });
}


const App: FunctionComponent = () => {
  const theme = createMyTheme({});

  //Two error boundaries are used: inner for localization and outer as a fallback
  return (
    <ErrorBoundary>
      <BrowserRouter>

        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <I18N>

              <ErrorBoundary>
                <Layout>
                  <Routes />
                </Layout>
              </ErrorBoundary>

            </I18N>
          </ThemeProvider>
        </StylesProvider>

      </BrowserRouter>
    </ErrorBoundary>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
