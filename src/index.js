// jshint ignore: start

import React from 'react';
import ReactDOM from 'react-dom';
import './renderer/index.css';
import App from './renderer/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />,document.getElementById('root'));

serviceWorker.unregister();

