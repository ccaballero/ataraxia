import 'semantic-ui-offline/semantic.css';

import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom';

import App from './containers/App.jsx';

render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('app')
);

