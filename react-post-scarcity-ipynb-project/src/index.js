import React from 'react';
import { createRoot } from 'react-dom/client';
import ResourceAllocationNetwork from './components/ResourceAllocationNetwork';
import DynamicResourceAllocationNetwork from './components/DynamicResourceAllocationNetwork';

const App = () => {
    return (
      <div className="app">
        <h1 className="text-center">Static vs. Dynamic Resource Allocation Network Comparison</h1>
        
        <div className="network-container">
          <div className="network-item">
            <h2>Static Resource Allocation Network</h2>
            <ResourceAllocationNetwork />
          </div>
          
          <div className="network-item">
            <h2>Dynamic Resource Allocation Network</h2>
            <DynamicResourceAllocationNetwork />
          </div>
        </div>
      </div>
    );
  };
  
// Render the App component to the DOM
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="demo" />)