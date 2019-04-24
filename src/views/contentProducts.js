
import React from 'react';
import { PageTemplate } from '../layouts/PageTemplate';
import SaleplacesList from '../components/saleplaces/SaleplacesList.js';

//import '../assets/css/contentProducts.css';


export const Products = () =>
  <PageTemplate>
    <section className="productsWrapper">
      
      <h1>[Product Catalog]</h1>

      <div className="productElements">
        <SaleplacesList />
      </div>
    </section>
  </PageTemplate>;
