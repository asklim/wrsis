'use strict';

function Greeting(props) {
  return React.createElement(
    'h1',
    null,
    'React Component: ',
    props.name
  );
}

var contentNode = document.getElementById('contents1');
var component1 = React.createElement(
  'h1',
  null,
  'Hello World!'
); // A simple JSX component
var component2 = React.createElement(Greeting, { name: 'Hello World!' });

ReactDOM.render(component1, contentNode); // Render the component inside the content Node

ReactDOM.render(component2, document.getElementById('contents2'));

var continents = ['Africa', 'America', 'Asia', 'Australia', 'Antarctida', 'Europe'];

// при маппинге строго кривая ковычка ``
var message = continents.map(function (c) {
  return 'Hello ' + c + '!';
}).join(' ');
var element = React.createElement(
  'p',
  null,
  message
);

ReactDOM.render(element, document.getElementById('contents3'));