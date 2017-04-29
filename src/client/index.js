import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../shared';

render((
  <Router>
    <App test="HELL WORLD" />
  </Router>
), document.getElementById('root'));
