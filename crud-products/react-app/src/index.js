import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.react';
import * as serviceWorker from './serviceWorker';

// Activate concurrent mode
ReactDOM.unstable_createRoot(document.getElementById('root')).render(
  <App />,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
