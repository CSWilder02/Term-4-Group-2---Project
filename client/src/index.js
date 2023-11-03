import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter from react-router-dom
import App from './App'; // Import your main application component

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);