
import React from 'react';
import { PageTemplate } from '../layoutA/PageTemplate';
import Hello from '../components/hello/Hello.js';

export const Home = () =>

  <PageTemplate>

    <section className="home">
      <h1>[Home Page]</h1>
      <hr className="separate"/>

      <Hello />

      <hr className="separate-elements"/>
    </section>

  </PageTemplate>;
