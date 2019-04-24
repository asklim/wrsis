import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating.js';


const ColorList = ({ colors=[] }) =>
  <div className="color-list">
    {(colors.length === 0) 
      ? <p>No Colors Listed. (Add a Color)</p> 
      : colors.map(color =>
          <Color key={color.id} {...color} />
        )
    }
  </div>;

ColorList.propTypes = {
  colors: PropTypes.array.isRequired
};

const Color = ({ title, color, rating=0 }) =>
  <section className="color">
    <h1>{title}</h1>
    <div className="color"
         style={{ backgroundColor: color }}>
    </div>
    <div>
    <StarRating starsSelected={rating} />
    </div>
  </section>;

Color.propTypes = {
  title: PropTypes.string.isRequired,  
  color: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default ColorList;
