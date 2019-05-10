import React from 'react';
//import { render } from 'react-dom';
//import { createBrowserHistory } from 'history';
import {
  HashRouter as Router
  , Route
  , Switch
} from 'react-router-dom';

import 'assets/css/app.css';

import { About } from 'viewsA/contentAbout';
import { Home } from 'viewsA/contentHome';
import { Events } from 'viewsA/contentEvents';
import { Products } from 'viewsA/contentProducts';
import { Contact } from 'viewsA/contentContact';
import { Agents } from 'viewsA/contentAgents';
import { Cash } from 'viewsA/contentCash';
import { Whoops404 } from 'viewsA/contentWhoops404';


//window.React = React;
//const browserHistory = createBrowserHistory();

class Level0 extends React.Component
{

  render() {    
    //<Router history={browserHistory}> 
    return (
      
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/agents" component={Agents} />      
          <Route path="/cash" component={Cash} />
          <Route path="/contact" component={Contact} />      
          <Route path="/events" component={Events} />
          <Route path="/products" component={Products} />
          <Route component={Whoops404} />
        </Switch> 
      </Router>
      
      //, document.getElementById('react-app')
    );
  }
}

export default Level0;

//console.log(React);
//console.log(ReactDOM);
