import React from 'react';

import { PageTemplate } from '../layoutA/PageTemplate';
import AgentsEditor from '../components/AgentsEditor'; 

export const Agents = () =>
  <PageTemplate>
    <section className="agentLayout">
      <h1>Agents</h1>
      <h6>Субъекты, взаимодействующие между собой.</h6>
      <hr className="separate"/>

      <AgentsEditor />
    </section>
  </PageTemplate>;
