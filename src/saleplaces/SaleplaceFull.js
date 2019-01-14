import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './../misc/StarRating.js';

export default class SaleplaceFull extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {

    var { data } = this.props;

    return (
      <div className='saleplacefull'>
        <p className='splaceId'>ID: {data._id}</p>
        <p>rec#: {data['rec#']}</p>
        <p>Name: {data.Name}</p>
        <p>Full: {data.FullName}</p>
        <p>Moll: {data.Moll}</p>
        <p>Floor: {data.Floor}</p>
        <p>Sectr: {data.Sector}</p>
        <p>Line: {data.Line}</p>
        <p>Place: {data.Place}</p>
        <p>Addr: {data.Address}</p>
        <p>Descr: {data.Description}</p>
        <p>Notes: {data.Notes}</p>
        <p>Host: {data.Host}</p>
        <p>Updated at: {data.updatedAt}</p>        
        <StarRating totalStars={7} starsSelected={data['rec#']} />
        <br/>
      </div>
    );
  }
}