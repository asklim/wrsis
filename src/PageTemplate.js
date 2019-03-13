'use strict';
import React from 'react';
//import { Link } from 'react-router-dom';
import { MainMenu } from './MainMenu';
//import { RightMenu } from './RightMenu';
import PropTypes from 'prop-types';

import './css/leftPanel.css';
import './css/rightPanel.css';
import './css/container.css';


export const PageTemplate = ({children}) => 
<div id="pageLayout">
  
  <div className="leftpanel">
    <div id="signin">
      <h5>0.0.2</h5>
    </div>

    <MainMenu />      
    
    <div id="info">        
    </div>
  </div>

  <div className="container">
    <div id="content">
      {children}
    </div>
  </div>

  <div className="rightpanel">      
    <div id="rightmenu">        
    </div>
    <div id="filter">        
    </div>
    <div id="jumper">        
    </div>
  </div>

</div>;

PageTemplate.propTypes = {
  children: PropTypes.object
};
