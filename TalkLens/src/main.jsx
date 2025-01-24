import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"; // Ensure the path is correct

import { PersistGate } from "redux-persist/integration/react";

// Render your application with Redux and Redux-Persist
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
