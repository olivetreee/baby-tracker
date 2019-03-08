import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();
