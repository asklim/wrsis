'use strict';

import './css/app.css';
import React from 'react';
import { render } from 'react-dom';

//import { createHashHistory } from 'history';
import {
  HashRouter as Router
  , Route
  , Switch
} from 'react-router-dom';

import { About } from './contentAbout';
import { Home } from './contentHome';
import { Events } from './contentEvents';
import { Products } from './contentProducts';
import { Contact } from './contentContact';
import { Cash } from './contentCash';
import { Whoops404 } from './contentWhoops404';


window.React = React;
//const hashHistory = createHashHistory();

render(
  <Router> 
  <div className='react-router'>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/cash" component={Cash} />
      <Route path="/events" component={Events} />
      <Route path="/products" component={Products} />
      <Route path="/contact" component={Contact} />
      <Route component={Whoops404} />
    </Switch>  
  </div>  
  </Router>,
  document.getElementById('react-app')
);

console.log(React);
//console.log(ReactDOM);




/*
function Greeting(props) {
  return (<h1>React Component: {props.name}</h1>);
}

var contentNode = document.getElementById('contents1');
var component1 = <h1>Hello World!</h1>; // A simple JSX component
const component2 = <Greeting name="Hello World!" />;

render(
  component1, 
  contentNode
); // Render the component inside the content Node

render(
  component2, 
  document.getElementById('contents2')
);

const continents = ['Africa','America',
  'Asia','Australia','Antarctida','Europe'];
  
// при маппинге строго кривая ковычка ``
const message = continents.map(c => `Hello ${c}!`).join(' '); 
const element = <p>{message}</p>;

render(
  element, 
  document.getElementById('contents3')
);

render(
  <h1>Hello, I am Groot</h1>, 
  document.getElementById('root')
);
*/

/*ReactDOM.render(
  <div className='header'>
    <strong className='summary'>Всего торговых мест: {placesCount}</strong>
  </div>,
  document.getElementById('header')
);*/