import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import { store } from "./reducers"
import App from './components/App';
import { Provider } from 'react-redux';

const Root = (
  <Provider store={ store }>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
