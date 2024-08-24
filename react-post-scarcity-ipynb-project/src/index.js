import React from 'react';
import { createRoot } from 'react-dom/client';
import ResourceAllocationNetwork from './components/ResourceAllocationNetwork';
import DynamicResourceAllocationNetwork from './components/DynamicResourceAllocationNetwork';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<DynamicResourceAllocationNetwork tab="Dynamic Information Market" />);
root.render(<ResourceAllocationNetwork tab="Information Market" />);