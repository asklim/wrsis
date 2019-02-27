'use strict';
import React from 'react';
import { PageTemplate } from './PageTemplate';
import SaleplacesList from './saleplaces/SaleplacesList.js';


export const Products = () =>
  <PageTemplate>
    <section className="products">
      <h1>[Product Catalog]</h1>
      <SaleplacesList />
    </section>
  </PageTemplate>;
