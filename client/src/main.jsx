import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Vendor from './pages/vendor.jsx';
import VendorClass from './pages/vendorClass.jsx';
import VendorTypes from './pages/vendorTypes.jsx';

import {
  BrowserRouter,
} from "react-router-dom";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     
        <BrowserRouter>
          <App />
        </BrowserRouter>
   
  </React.StrictMode>
);
