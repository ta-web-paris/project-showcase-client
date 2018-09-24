import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'; // Importing the component

ReactDOM.render(
<BrowserRouter basename={process.env.PUBLIC_URL}><App /></BrowserRouter>, // Wrapping the <App /> inside the router
document.getElementById('root'));
registerServiceWorker();
