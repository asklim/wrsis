/*"use strict";*/
import React from 'react';
import PropTypes from 'prop-types';
//import StarRating from './misc/StarRating.js';

const FormAddColor = ({onNewColor=f=>f}) => {
  let _title, _color;
  const submit = e => {
    e.preventDefault();
    onNewColor(_title.value, _color.value);
    _title.value = '';
    _color.value = '#000000';
    _title.focus();
  };

  return (
    <div>
    <br/>
    <form onSubmit={submit}>
      <input ref={input => _title = input} 
             type="text"
             placeholder="color title..." required/>
      <input ref={input => _color = input} 
             type="color" required/>
      <button>ADD</button>
    </form>
    <br/>    
    </div>
  );
};

FormAddColor.propTypes = {
  onNewColor: PropTypes.func
};

FormAddColor.defaultProps = {
  onNewColor: f=>f
};

export default FormAddColor;

