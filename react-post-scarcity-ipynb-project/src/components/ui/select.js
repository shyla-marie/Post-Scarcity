// src/components/ui/select.js

import React, { useState } from 'react';
import './styles/select.css';

export const Select = ({ children, onValueChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || placeholder}
      </div>
      {isOpen && (
        <div className="select-content">
          {React.Children.map(children, child =>
            React.cloneElement(child, { onSelect: handleSelect })
          )}
        </div>
      )}
    </div>
  );
};

export const SelectItem = ({ children, value, onSelect }) => (
  <div className="select-item" onClick={() => onSelect(value)}>
    {children}
  </div>
);