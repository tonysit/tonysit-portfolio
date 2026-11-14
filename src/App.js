import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams
} from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

import './styles/custom.scss';
import DispatchContext from './contexts/DispatchContext';
import StateReducer, { initialState } from './reducers/StateReducer';
import Styles from './styles/Styles';
import StateContext from './contexts/StateContext';
import Header from './components/common/Header';
import Reducers from './configs/Reducers';
import Routes from './configs/Routes';
import useWindowDimensions from './hooks/useWindowDimensions';

// create redux middleware
let middleware = [thunk];
if(process.env.NODE_ENV !== 'production'){
  middleware.push(createLogger({
    collapsed: true,
    predicate: (getState, action) => true,
  }));
}
const store = createStore(
  combineReducers(Reducers), 
  applyMiddleware(...middleware)
);

// fontFamily: font
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: Styles.primaryColor,
    },
    secondary: {
      main: Styles.secondaryColor,
    },
  },
});

// kick off the polyfill!
smoothscroll.polyfill();

const LoadStyles = () => {
  if (Styles !== undefined && Styles !== null) {
    Object.keys(Styles).forEach((k) => {
      const root = document.documentElement;
      if (root?.style && typeof root.style.setProperty === 'function') {
        root.style.setProperty(
          `--${k}`,
          Styles[k],
        );
      }
    });
  }
};

const App = () => {
  const { i18n } = useTranslation();
  const [state, dispatch] = React.useReducer(StateReducer, initialState);
  const { height } = useWindowDimensions();
  React.useEffect(() => {
    // setting height to css var when screen height changed
    const root = document.documentElement;
    if (root?.style && typeof root.style.setProperty === 'function') {
      root.style.setProperty(
        '--screenHeight',
        `${height}px`,
      );
    }
  }, [height]);
  React.useEffect(() => {
    LoadStyles();
  }, []);
  React.useEffect(() => {
    if (i18n.language !== state.i18n) {
      i18n.changeLanguage(state.i18n);
    }
  }, [state.i18n]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <Provider store={store}>
            <Router>
              <div className="app-background" />
              <Header />
              <div className="scroll-wrapper">
                <Switch>{Routes.map((props, index) => <Route key={index} {...props} />)}</Switch>
              </div>
            </Router>
          </Provider>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </ThemeProvider>
  );
};

export default App;
