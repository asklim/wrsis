'use strict';
import React from 'react';
import { PageTemplate } from './PageTemplate';

import AgentEditorForm from './agenteditor/AgentEditorForm'; 

export const Agents = () =>
  <PageTemplate>
    <section className="agentLayout">
      <h1>Agents</h1>
      <h6>Субъекты, взаимодействующие между собой.</h6>
      <hr className="separate"/>

      <AgentEditorForm />
    </section>
  </PageTemplate>;
