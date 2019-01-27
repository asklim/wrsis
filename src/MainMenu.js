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
      <NavLink to="/">
        <FaHome />     
      </NavLink>
    </NavItem>

    <NavItem eventKey={'about'} href="/about">
      <NavLink to="/about" activeStyle={selectedStyle}>
        [About]
      </NavLink>
    </NavItem>

    <NavItem eventKey={'events'} href="/events">
      <NavLink to="/events" activeStyle={selectedStyle}>
        [Events]
      </NavLink>
    </NavItem>

    <NavItem eventKey={'products'} href="/products">
      <NavLink to="/products" activeStyle={selectedStyle}>
        [Products]
      </NavLink>
    </NavItem>

    <NavItem eventKey={'contact'} href="/contact">
      <NavLink to="/contact" activeStyle={selectedStyle}>
        [Contact Us]
      </NavLink>
    </NavItem>
  </Nav>
);


export const RightMenu = () => (


    <ul className="right-menu">
      <li>
        <NavLink to="/">
          <FaHome /><span> Home</span>     
        </NavLink>
      </li>
      <li>
      <NavLink to="/about" activeStyle={selectedStyle}>
        [About]
      </NavLink>
      </li>

      <li>
      <NavLink to="/events" activeStyle={selectedStyle}>
        [Events]
      </NavLink>
      </li>

      <li>
      <NavLink to="/products" activeStyle={selectedStyle}>
        [Products]
      </NavLink>
      </li>

      <li>
      <NavLink to="/contact" activeStyle={selectedStyle}>
        [Contact Us]
      </NavLink>
      </li>
      </ul>
);