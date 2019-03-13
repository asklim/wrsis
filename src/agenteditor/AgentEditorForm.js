import React from 'react';
//import PropTypes from 'prop-types';

import AgentSelector from './AgentSelector';
import AgentEditor from './AgentEditor';
import './AgentEditorForm.css';


export default class AgentEditorForm extends React.Component
{

  render()
  {
    return (
    <div>
      <div className='AgentEditorFormWrapper'>
        <AgentSelector/>
        <AgentEditor />
      </div>
      <button>Info</button>
    </div>
    );
  }
}