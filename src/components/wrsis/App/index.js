import { hot } from 'react-hot-loader';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import React from "react";

// core components
import Admin from "layouts/Admin.js";
import Invoice from "layouts/Invoice.js";
import RTL from "layouts/RTL.js";
import UISamples from "layouts/UISamples.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const browserHistory = createBrowserHistory();

//console.log('running ReactApp');
const App = () =>
  <Router history ={browserHistory}>
  <Switch>
    <Route path ="/admin" component ={Admin} />
    <Route path ="/invoice" component ={Invoice} />       
    <Route path ="/rtl" component ={RTL} />       
    <Route path ="/uisamples" component ={UISamples} />     

    <Redirect from ="/i" to ="/invoice/dashboard" />
    <Redirect from ="/s" to ="/uisamples/dashboard" />
    <Redirect from ="/" to ="/admin/dashboard" />     

  </Switch>
  </Router>
;

export default hot(module)( App );