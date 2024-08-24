// src/components/ui/card.js

import React from 'react';
import './styles/card.css';

export const Card = ({ children, className, ...props }) => (
  <div className={`card ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h2 className={`card-title ${className}`} {...props}>
    {children}
  </h2>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={`card-content ${className}`} {...props}>
    {children}
  </div>
);