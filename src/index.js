import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // something material ui needs...
import thunk from 'redux-thunk';

import web3Redux from './src/reducer';
import reducer from './reducer'

import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

// <MuiThemeProvider>
// </MuiThemeProvider>
render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
