import React from 'react';
//import { Link } from 'react-router-dom';
import { MainMenu, RightMenu } from './MainMenu';
import PropTypes from 'prop-types';

import Hello from './hello/Hello.js';
import { ColorPickupBody, defaultColors } from './misc/ColorPickupBody.js';
import SaleplacesList from './saleplaces/SaleplacesList.js';


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
        <RightMenu />
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


export const Home = () =>
  <PageTemplate>
    <section className="home">
      <h1>[Home Page]</h1>
      <hr className="separate"/>
      <Hello />
      <hr className="separate-elements"/>
    </section>
  </PageTemplate>;


export const Whoops404 = ({ location }) => (
  <PageTemplate>
    <section className="whoops-404">
      <h1>Resource not found at &apos;{location.pathname}&apos;</h1>   
    </section>
  </PageTemplate>
);
Whoops404.propTypes = {
  location: PropTypes.object
};


export const Events = () =>
  <PageTemplate>
    <section className="events">
      <h1>[Event Calendar]</h1>    
      <ColorPickupBody colors={defaultColors}/>
    </section>
  </PageTemplate>;

export const Products = () =>
  <PageTemplate>
    <section className="products">
      <h1>[Product Catalog]</h1>
      <SaleplacesList />
    </section>
  </PageTemplate>;

export const Contact = () =>
  <PageTemplate>
    <section className="contact">
      <h1>[Contact Us]</h1>
    </section>
  </PageTemplate>;



