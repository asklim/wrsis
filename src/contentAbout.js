'use strict';
import React from 'react';
import { HashLink as HLink } from 'react-router-hash-link';

import { PageTemplate } from './PageTemplate';
import './css/contentAbout.css';

export const About = () =>
<PageTemplate>
  <section className="aboutLayout">
    
    <a id="our-services1"></a>
    <h1>About</h1>
    <hr className="separate"/>

    <div className="aboutWrapper">

      <div className="aboutElements">
        <h2>Our Services One</h2>
        <h5>
          <HLink to="/about#our-services2">Our Services Two</HLink>
          <br/>
          <HLink to="/about#our-services3">Our Services Three</HLink>
        </h5>        
        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Integer nec odio.
          Praesent libero. Sed cursus ante dapibus
          diam. Sed nisi. Nulla quis sem at nibh
          elementum imperdiet. Duis sagittis ipsum.
          Praesent mauris. Fusce nec tellus sed
          augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla.
          Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos
          himenaeos. Curabitur sodales ligula in
          libero.
        </p>
        <p>
          Sed dignissim lacinia nunc. Curabitur
          tortor. Pellentesque nibh. Aenean quam. In
          scelerisque sem at dolor. Maecenas mattis.
          Sed convallis tristique sem. Proin ut
          ligula vel nunc egestas porttitor. Morbi
          lectus risus, iaculis vel, suscipit quis,
          luctus non, massa. Fusce ac turpis quis
          ligula lacinia aliquet. Mauris ipsum.
          Nulla metus metus, ullamcorper vel,
          tincidunt sed, euismod in, nibh. Quisque
          volutpat condimentum velit. Class patent
          taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>
        <hr className="separate-elements"/>
      </div>

      <div className="aboutElements">
        <a id="our-services2"></a>
        <h2>Our Services Two</h2>
        <h5>
          <HLink to="/about#our-services1">Our Services One</HLink>
          <br/>
          <HLink to="/about#our-services3">Our Services Three</HLink>
        </h5>  
        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Integer nec odio.
          Praesent libero. Sed cursus ante dapibus
          diam. Sed nisi. Nulla quis sem at nibh
          elementum imperdiet. Duis sagittis ipsum.
          Praesent mauris. Fusce nec tellus sed
          augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla.
          Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos
          himenaeos. Curabitur sodales ligula in
          libero.
        </p>
        <p>
          Sed dignissim lacinia nunc. Curabitur
          tortor. Pellentesque nibh. Aenean quam. In
          scelerisque sem at dolor. Maecenas mattis.
          Sed convallis tristique sem. Proin ut
          ligula vel nunc egestas porttitor. Morbi
          lectus risus, iaculis vel, suscipit quis,
          luctus non, massa. Fusce ac turpis quis
          ligula lacinia aliquet. Mauris ipsum.
          Nulla metus metus, ullamcorper vel,
          tincidunt sed, euismod in, nibh. Quisque
          volutpat condimentum velit. Class patent
          taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>
        <hr className="separate-elements"/>
      </div>

      <div className="aboutElements">
        <a id="our-services3"></a>
        <h2>Our Services Three</h2>
        <h5>
          <HLink to="/about#our-services1">Our Services One</HLink>
          <br/>
          <HLink to="/about#our-services2">Our Services Two</HLink>
        </h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Integer nec odio.
          Praesent libero. Sed cursus ante dapibus
          diam. Sed nisi. Nulla quis sem at nibh
          elementum imperdiet. Duis sagittis ipsum.
          Praesent mauris. Fusce nec tellus sed
          augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla.
          Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos
          himenaeos. Curabitur sodales ligula in
          libero.
        </p>
        <p>
          Sed dignissim lacinia nunc. Curabitur
          tortor. Pellentesque nibh. Aenean quam. In
          scelerisque sem at dolor. Maecenas mattis.
          Sed convallis tristique sem. Proin ut
          ligula vel nunc egestas porttitor. Morbi
          lectus risus, iaculis vel, suscipit quis,
          luctus non, massa. Fusce ac turpis quis
          ligula lacinia aliquet. Mauris ipsum.
          Nulla metus metus, ullamcorper vel,
          tincidunt sed, euismod in, nibh. Quisque
          volutpat condimentum velit. Class patent
          taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>
        <hr className="separate-elements"/>
      </div>
    </div>
  </section>
</PageTemplate>;
