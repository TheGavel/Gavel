import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createRoot } from 'react-dom/client';
import App from "../components/cardlist";

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<App/>);
})
