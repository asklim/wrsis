import React from 'react';

import { PageTemplate } from '../layoutA/PageTemplate';
import TodosEditor from '../components/TodosEditor';

export const Contact = () =>
  <PageTemplate>
    <section className="contact">
      <h1>[Contact Us]</h1>

      <TodosEditor/>

    </section>
  </PageTemplate>;
