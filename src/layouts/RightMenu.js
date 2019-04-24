
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

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
function handleSelectMenuItem(selectedKey) {
  console.log(`RightMenu selected`);
  console.log(selectedKey);
  document.title = `${selectedKey} - rsis`;
}

export const RightMenu = () => (


    <ul className="right-menu" onFocus={handleSelectMenuItem}>
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
      <NavLink to="/cash" activeStyle={selectedStyle}>
        [Выручка]
      </NavLink>
      </li>

      <li>
      <NavLink to="/contact" activeStyle={selectedStyle}>
        [Contact Us]
      </NavLink>
      </li>
      </ul>
);
