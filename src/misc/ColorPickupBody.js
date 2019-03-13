import React from 'react';
import PropTypes from 'prop-types';
import ColorList from './ColorList.js';
import FormAddColor from './FormAddColor.js';
import { v4 } from 'uuid';


export const defaultColors = [
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

export class ColorPickupBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: props.colors || []
    };
    //this.addColor = this.addColor.bind(this);
    //для функц.выражения это не надо
  }

  static propTypes = {
    colors: PropTypes.array
  }

  addColor = (title, color) =>
  {
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

  render()
  {    
    const { colors } = this.state;
    return (
      <div className="colorPickupBody">                
        <FormAddColor onNewColor={this.addColor}/>
        <ColorList colors={colors} />
        <br/>
      </div>
    );
  }
}
