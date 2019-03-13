'use strict';
import React from 'react';
import { PageTemplate } from './PageTemplate';
import {
  ColorPickupBody, 
  defaultColors 
} from './misc/ColorPickupBody.js';

export const Events = () =>
  <PageTemplate>
    <section className="eventsLayout">
      <h1>[Event Calendar]</h1>    
      <hr className="separate"/>
      <ColorPickupBody colors={defaultColors}/>
    </section>
  </PageTemplate>;
