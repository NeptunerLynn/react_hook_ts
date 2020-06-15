import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './Page';
import * as serviceWorker from './serviceWorker';
import { AlitaProvider } from 'redux-alita';

ReactDOM.render(
  <AlitaProvider>
    <Page />
  </AlitaProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
