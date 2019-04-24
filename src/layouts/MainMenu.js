import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome,
  FaFontAwesomeLogoFull as FaEmpty,
  FaVectorSquare as FaAgents,
  FaInfoCircle as FaInfo,
  FaRegMoneyBillAlt as FaMoney 
} from 'react-icons/fa';
/**
 * использование двух доп.шрифтов:
 * Github octicons and Game Icons
 * увеличило bundle.js с 2.6 до 9.3 MiB !!!
**/

import '../assets/css/menus.css';


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
      >
      <span><FaInfo/> About</span>
    </NavLink></li>

    <li><NavLink to="/events"
        activeClassName='main-menu active'   
        isActive={handleActive}
        >
        <span><FaEmpty/> Events</span>
    </NavLink></li>

    <li><NavLink to="/products"
        activeClassName='main-menu active'
        isActive={handleActive}
        >
        <span><FaEmpty/> Products</span>
    </NavLink></li>

    <li><NavLink to="/cash"
        activeClassName='main-menu active'
        isActive={handleActive}
        >
        <span><FaMoney/> Выручка</span>
    </NavLink></li>

    <li><NavLink to="/agents"
      activeClassName='main-menu active'
      isActive={handleActive}
      >
      <span><FaAgents/> Субъекты</span>
    </NavLink></li>

    <li><NavLink to="/contact"
      activeClassName='main-menu active'
      isActive={handleActive}
      >
      <span><FaEmpty/> Contact Us</span>
    </NavLink></li>

  </ul>
</div>;

/*
<NavItem eventKey={'contact'} href="/#/contact">
[Contact Us]
</NavItem>
*/
