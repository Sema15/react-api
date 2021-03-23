import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { Provider } from 'mobx-react';

const Root = (
  <Provider>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
