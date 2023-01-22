// =========================================================
// * Volt React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * Official Repository: https://github.com/themesberg/volt-react-dashboard
// * License: MIT License (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, withRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

import { ThemeProvider } from "@themesberg/react-bootstrap";

import { Provider } from "react-redux";
import store from "./store";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  background:'white',
  color:'black'
};

ReactDOM.render(
  <HashRouter>
    <ScrollToTop />
   
      <ThemeProvider dir="rtl">
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <HomePage />
          </AlertProvider>
        </Provider>
        ,
      </ThemeProvider>
    
  </HashRouter>,
  document.getElementById("root")
);
