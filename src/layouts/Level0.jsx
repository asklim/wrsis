import React from 'react';
//import { render } from 'react-dom';
//import { createBrowserHistory } from 'history';
import {
  HashRouter as Router
  , Route
  , Switch
} from 'react-router-dom';

import '../assets/css/app.css';

import { About } from '../views/contentAbout';
import { Home } from '../views/contentHome';
import { Events } from '../views/contentEvents';
import { Products } from '../views/contentProducts';
import { Contact } from '../views/contentContact';
import { Agents } from '../views/contentAgents';
import { Cash } from '../views/contentCash';
import { Whoops404 } from '../views/contentWhoops404';


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
