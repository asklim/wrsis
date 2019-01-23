//import { Link } from 'react-router-dom';
import { MainMenu } from './MainMenu';

import Hello from './hello/Hello.js';
import { ColorPickupBody, defaultColors } from './misc/ColorPickupBody.js';
import SaleplacesList from './saleplaces/SaleplacesList.js';

const PageTemplate = ({children}) =>
  <div className="page">
    <MainMenu />
    {children}
  </div>;

export const Home = () =>
  <PageTemplate>
    <section className="home">
      <h1>[Home Page]</h1>
      <Hello />
    </section>
  </PageTemplate>;

export const Whoops404 = ({ location }) => (
  <PageTemplate>
    <section className="whoops-404">
      <h1>Resource not found at '{location.pathname}'</h1>   
    </section>
  </PageTemplate>
);

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

export const About = ({ match }) =>
  <PageTemplate>
    <section className="about">
      <h1>About</h1>
    </section>
  </PageTemplate>;


