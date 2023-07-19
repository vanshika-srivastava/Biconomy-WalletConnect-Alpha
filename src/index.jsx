import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './App';
import logo from "./logo.svg"


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <img src={logo} alt="Logo" />
    <HomePage />
  </React.StrictMode>
);

reportWebVitals();
