import React, { useState, ReactNode } from 'react';
import './styles/select.css';

interface SelectProps<T extends string> {
  children: ReactNode;
  onValueChange: (value: T) => void;
  placeholder: string;
}

export function Select<T extends string>({ children, onValueChange, placeholder }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<T | ''>('');

  const handleSelect = (value: T) => {
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
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<SelectItemProps<T>>, { onSelect: handleSelect })
              : child
          )}
        </div>
      )}
    </div>
  );
}

interface SelectItemProps<T extends string> {
  children: ReactNode;
  value: T;
  onSelect?: (value: T) => void;
}

export function SelectItem<T extends string>({ children, value, onSelect }: SelectItemProps<T>) {
  return (
    <div className="select-item" onClick={() => onSelect && onSelect(value)}>
      {children}
    </div>
  );
}

export const SelectTrigger: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="select-trigger">{children}</div>
);

export const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <span className="select-value">{placeholder}</span>
);

export const SelectContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="select-content">{children}</div>
);


// // src/components/ui/select.js

// import React, { useState } from 'react';
// import './styles/select.css';

// export const Select = ({ children, onValueChange, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState('');

//   const handleSelect = (value) => {
//     setSelectedValue(value);
//     onValueChange(value);
//     setIsOpen(false);
//   };

//   return (
//     <div className="select-container">
//       <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
//         {selectedValue || placeholder}
//       </div>
//       {isOpen && (
//         <div className="select-content">
//           {React.Children.map(children, child =>
//             React.cloneElement(child, { onSelect: handleSelect })
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export const SelectItem = ({ children, value, onSelect }) => (
//   <div className="select-item" onClick={() => onSelect(value)}>
//     {children}
//   </div>
// );