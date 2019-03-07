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

/*
const styleActive = { fontWeight: 'bold', 
                      backgroundColor: 'white',
                      color: 'orangered'};
*/

export const MainMenu = () =>
<div
  id="leftmenu" className="main-menu">
  <ul>
    <li><NavLink exact to="/"
        activeClassName='main-menu active'
        isActive={handleActive}
    >
        <span style={{font:'2em'}}>
            <FaHome /> Home
        </span>
    </NavLink></li>

    <li><NavLink to="/about"
        activeClassName='main-menu active'
        isActive={handleActive}
       >[About] <FaHome/>
    </NavLink></li>

    <li><NavLink to="/events"
        activeClassName='main-menu active'   
        isActive={handleActive}
        >[Events]      
    </NavLink></li>

    <li><NavLink to="/products"
        activeClassName='main-menu active'
        isActive={handleActive}
        >[Products]      
    </NavLink></li>

    <li><NavLink to="/cash"
        activeClassName='main-menu active'
        isActive={handleActive}
        >Выручка
    </NavLink></li>

    <li><NavLink to="/agents"
        activeClassName='main-menu active'
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
