import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

import 'bulma/css/bulma.css'
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL

createRoot(document.getElementById('root')).render(<App />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
