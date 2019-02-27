'use strict';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './css/menus.css';


const selectedStyle = {
  backgroundColor: "darkorange",
  color: "slategray"
};

/*    
    <NavLink to="/">
      <span style="font-size: 3em; color: darkorange;">
        <i className="fas fa-home"></i>
      </span>      
    </NavLink>
*/

function handleSelect(selectedKey) {
  //console.log(`MainMenu selected ${selectedKey}`);
  document.title = `${selectedKey} - rsis`;
}


export const MainMenu = () => (

  <Nav className="main-menu" bsStyle="pills" stacked activeKey={1} 
       onSelect={handleSelect}>

    <NavItem eventKey={'home'} href="/">
        <span><FaHome /> [home.1]</span>         
    </NavItem>

    <NavItem eventKey={'about'} href="/about">
        [About] <FaHome/>
    </NavItem>

    <NavItem eventKey={'events'}>
      <NavLink to="/events" activeStyle={selectedStyle}>
        [Events]
      </NavLink>
    </NavItem>

    <NavItem eventKey={'products'}>
      <NavLink to="/products" activeStyle={selectedStyle}>
        [Products]
      </NavLink>
    </NavItem>

    <NavItem eventKey={'cash'}>
      <NavLink to="/cash" activeStyle={selectedStyle}>
        [Выручка]
      </NavLink>
    </NavItem>

    <NavItem eventKey={'contact'}>
      <NavLink to="/contact" activeStyle={selectedStyle}>
        [Contact Us]
      </NavLink>
    </NavItem>
  </Nav>
);
