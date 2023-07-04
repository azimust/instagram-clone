import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalContextProvider from './state/context/GlobalContext';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <Toaster />
        <App />
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);