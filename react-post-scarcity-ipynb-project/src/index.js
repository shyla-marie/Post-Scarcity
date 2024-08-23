import React from 'react';
import { createRoot } from 'react-dom/client';
import ResourceAllocationNetwork from './ResourceAllocationNetwork';
import DynamicResourceAllocationNetwork from './DynamicResourceAllocationNetwork';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<DynamicResourceAllocationNetwork tab="Dynamic Information Market" />);
root.render(<ResourceAllocationNetwork tab="Information Market" />);