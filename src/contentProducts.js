'use strict';
import React from 'react';
import { PageTemplate } from './PageTemplate';
import SaleplacesList from './saleplaces/SaleplacesList.js';
//import './css/contentProducts.css';


export const Products = () =>
  <PageTemplate>
    <section className="productsWrapper">
      
      <h1>[Product Catalog]</h1>

      <div className="productElements">
        <SaleplacesList />
      </div>
    </section>
  </PageTemplate>;
