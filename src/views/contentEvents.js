
import React from 'react';
import { PageTemplate } from '../layouts/PageTemplate';
import {
  ColorPickupBody, 
  defaultColors 
} from '../components/misc/ColorPickupBody.js';

export const Events = () =>
  <PageTemplate>
    <section className="eventsLayout">
      <h1>[Event Calendar]</h1>    
      <hr className="separate"/>
      <ColorPickupBody colors={defaultColors}/>
    </section>
  </PageTemplate>;
