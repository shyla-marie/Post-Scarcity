// src/components/ui/button.js

import React from 'react';
import './styles/button.css';

export const Button = ({ children, className, ...props }) => (
  <button className={`button ${className}`} {...props}>
    {children}
  </button>
);