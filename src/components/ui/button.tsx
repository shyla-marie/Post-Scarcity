import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import './styles/button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button className={`button ${className}`} {...props}>
    {children}
  </button>
);