import React from 'react';
import { render} from 'react-dom';
import App from './app.js';

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


window.React = React;
render(
  <App />,
  document.getElementById('body1')
);

console.log(React);
//console.log(ReactDOM);
