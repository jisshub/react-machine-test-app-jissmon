import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
let root;
if (rootElement) {
  root = ReactDOM.createRoot(rootElement);
  if (root) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}
  if (root) {
  }
if (root) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}