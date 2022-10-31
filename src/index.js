import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';
import Moralis from 'moralis';

const serverUrl = "https://dazx73hqzmpc.usemoralis.com:2053/server";
        const appId = "1HI0HUzgFNDiBKGgG9X70W7Ca20afpy7JuVQss58";
        Moralis.start({
            serverUrl,
            appId
        });

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId="1HI0HUzgFNDiBKGgG9X70W7Ca20afpy7JuVQss58" serverUrl="https://dazx73hqzmpc.usemoralis.com:2053/server">
      <NotificationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
