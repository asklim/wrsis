'use strict';
import React from 'react';
//import { Link } from 'react-router-dom';
import { MainMenu } from './MainMenu.1.js';
//import { RightMenu } from './RightMenu';
import PropTypes from 'prop-types';

import './css/leftPanel.css';
import './css/rightPanel.css';
import './css/container.css';


export const PageTemplate = ({children}) => (

  <div id="layout">
    <div className="leftpanel">
      <div id="signin">

      </div>
      <div id="leftmenu">
        <MainMenu />
      </div>
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
  </div>
);
PageTemplate.propTypes = {
  children: PropTypes.object
};
