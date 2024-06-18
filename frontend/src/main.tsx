import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Render the React application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* App component wrapped in React.StrictMode to help identify potential problems */}
    <App />
  </React.StrictMode>,
);
