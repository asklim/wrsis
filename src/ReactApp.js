'use strict';
import React from 'react';
import { render} from 'react-dom';
import PropTypes from 'prop-types';
import Hello from './hello/Hello.js';
import FormAddColor from './FormAddColor.js';
import ColorList from './misc/ColorList.js';
import SaleplacesList from './saleplaces/SaleplacesList.js';
import { v4 } from 'uuid';
//@import './css/app.css'; 
import css from './css/app.css';

const defaultColors = [
  {
  "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
  "title": "ocean at dusk",
  "color": "#00c4e2",
  "rating": 5
  },
  {
  "id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
  "title": "lawn",
  "color": "#26ac56",
  "rating": 3
  },
  {
  "id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
  "title": "bright red",
  "color": "#ff0000",
  "rating": 0
  }
];

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: props.colors || []
    };
    this.addColor = this.addColor.bind(this);
  }

  static propTypes = {
    colors: PropTypes.array
  }

  addColor(title, color) {
    const colors = [
      ...this.state.colors,
      {
        id: v4(),
        title,
        color,
        rating: 0
      }
    ];
    this.setState({colors});
  }

  render() {
    //const { addColor } = this;
    const { colors } = this.state;
    return (
      <div className="body">                
        <FormAddColor onNewColor={this.addColor}/>
        <ColorList colors={colors} />
        <br/>
      </div>
    );
  }
}

window.React = React;

render(
  <Body colors={defaultColors}/>,
  document.getElementById('contents1')
);

render(
  <SaleplacesList />,
  document.getElementById('contents2')
);

render(
  <Hello />,
  document.getElementById('contents3')
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