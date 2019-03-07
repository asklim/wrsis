'use strict';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import './css/menus.css';


const handleActive = (match) => //, location) => 
{  
  if (!match) { 
    return false;
  }
  //console.log('MainMenu.2 match', match);
  //console.log('MainMenu.2 location', location);
  if (match.isExact) {
    document.title = `${match.url} - rsis`;    
  }
  return true;
};

const styleActive = { fontWeight: 'bold', 
                      backgroundColor: 'white',
                      color: 'orangered'};

export const MainMenu = () =>
<div
  id="leftmenu" className="main-menu">
  <ul>
    <li><NavLink exact to="/"
        activeStyle = {styleActive}
        isActive={handleActive}
    >
        <span style={{font:'2em'}}>
            <FaHome /> Home
        </span>
    </NavLink></li>

    <li><NavLink to="/about"
        activeStyle = {styleActive}    
        isActive={handleActive}
       >[About] <FaHome/>
    </NavLink></li>

    <li><NavLink to="/events"
        activeStyle = {styleActive}    
        isActive={handleActive}
        >[Events]      
    </NavLink></li>

    <li><NavLink to="/products"
        activeStyle = {styleActive}
        isActive={handleActive}
        >[Products]      
    </NavLink></li>

    <li><NavLink to="/cash"
        activeStyle = {styleActive}
        isActive={handleActive}
        >Выручка
    </NavLink></li>

    <li><NavLink to="/agents"
        activeStyle = {styleActive}
        isActive={handleActive}
        >Субъекты
    </NavLink></li>
  </ul>
</div>;

/*
<NavItem eventKey={'contact'} href="/#/contact">
[Contact Us]
</NavItem>
*/
