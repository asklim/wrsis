import React from 'react';
import PropTypes from 'prop-types';

class SaleplacesSummary extends React.Component {
  
/*  constructor(props) {
    super(props);    
  }
*/
  render() {
  
    const { count } = this.props;
    return (
      <div className="saleplacessummary">
        <strong className='summary'>Всего торговых мест: {count}</strong>
      </div>
    );
  }
}

SaleplacesSummary.propTypes = {
  count: PropTypes.number.isRequired
};

export default SaleplacesSummary;