import React, { Suspense } from 'react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { Switch, Route } from 'react-router-dom';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { Provider } from 'react-redux';
import store from 'state';
import './i18n';
import { mainTheme } from './theme';
import { GlobalConst } from 'constants/index';
import { getLibrary } from 'utils';
import { PageLayout } from 'layouts';
import Background from 'layouts/Background';
import LandingPage from 'pages/LandingPage';
import StyledThemeProvider from 'theme/index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Web3ReactManager } from 'components';

const Web3ProviderNetwork = createWeb3ReactRoot(
  GlobalConst.utils.NetworkContextName,
);

const ThemeProvider: React.FC = ({ children }) => {
  const theme = mainTheme;

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

const Providers: React.FC = ({ children }) => {
  return (
    <div>
      <Suspense fallback={<Background fallback={true} />}>
        <ThemeProvider>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Suspense>
    </div>
  );
};
const App: React.FC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <Providers>
            <StyledThemeProvider>
              <Web3ReactManager>
                <Switch>
                  <Route exact path='/'>
                    <PageLayout>
                      <LandingPage />
                    </PageLayout>
                  </Route>
                </Switch>
              </Web3ReactManager>
            </StyledThemeProvider>
          </Providers>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};

export default App;
