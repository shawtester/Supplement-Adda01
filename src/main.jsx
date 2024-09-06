import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Adjust the import based on your file structure
import App from './App'; // Adjust the import based on your file structure
import { createRoot } from 'react-dom/client'
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
