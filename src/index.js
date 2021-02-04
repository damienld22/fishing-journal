import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line
import FULLTILT from './fulltilt';

ReactDOM.render(<App/>, document.querySelector('#root')
);

serviceWorker.register();
