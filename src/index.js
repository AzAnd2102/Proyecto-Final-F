import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

<<<<<<< HEAD
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter } from 'react-router-dom';
>>>>>>> e50ef7392958aa80ce06aa2512e3a9534720fa9c

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);