
import React from 'react';
import { PageTemplate } from '../layouts/PageTemplate';
import PropTypes from 'prop-types';

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
