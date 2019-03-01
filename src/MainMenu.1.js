'use strict';
import React from 'react';
import { FaHome } from 'react-icons/fa';
//import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './css/menus.css';


function handleSelect(selectedKey) {
  //console.log(`MainMenu selected ${selectedKey}`);
  document.title = `${selectedKey} - rsis`;
}


export const MainMenu = () => (

  <Nav className="main-menu" 
       bsStyle="pills" 
       stacked activeKey={1} 
       onSelect={handleSelect}>

    <NavItem eventKey={'home'} href="/#/">
        <span style={{font:'36px'}}><FaHome /> [home.1]</span>
    </NavItem>

    <NavItem eventKey={'about'} href="/#/about">
        [About] <FaHome/>
    </NavItem>

    <NavItem eventKey={'events'} href="/#/events">      
        [Events]      
    </NavItem>

    <NavItem eventKey={'products'} href="/#/products">
        [Products]      
    </NavItem>

    <NavItem eventKey={'cash'} href="/#/cash">
        [Выручка]
    </NavItem>

    <NavItem eventKey={'contact'} href="/#/contact">
        [Contact Us]
    </NavItem>
  </Nav>
);
