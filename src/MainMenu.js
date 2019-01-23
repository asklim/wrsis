import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './css/menus.css';

const selectedStyle = {
//  backgroundColor: "white",
//  color: "slategray"
};

/*    
    <NavLink to="/">
      <span style="font-size: 3em; color: darkorange;">
        <i className="fas fa-home"></i>
      </span>      
    </NavLink>
*/
export const MainMenu = () =>
  <nav className="main-menu">
    <NavLink to="/">
      <FaHome />     
    </NavLink>

    <NavLink to="/about" activeStyle={selectedStyle}>
      [About]
    </NavLink>

    <NavLink to="/events" activeStyle={selectedStyle}>
      [Events]
    </NavLink>

    <NavLink to="/products" activeStyle={selectedStyle}>
      [Products]
    </NavLink>

    <NavLink to="/contact" activeStyle={selectedStyle}>
      [Contact Us]
    </NavLink>
  </nav>;