import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from '../src/components/redux/app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provider component uses React Context, and will provide the store to every component in the application  */}
    <Provider store={store}>
    <App />
    </Provider> 
  </React.StrictMode>
);

