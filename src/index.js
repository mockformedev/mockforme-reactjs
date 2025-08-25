import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { mockforme } from 'mockforme';

const env = "development";

if (env === "development") {
  /**
   * You can get access token from:
   * https://dashboard.mockforme.com/user/token
   *
   * Note: Replace ACCESS_TOKEN with your actual access token
   */
  const TOKEN = "ACCESS_TOKEN";
  mockforme(TOKEN).run();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
