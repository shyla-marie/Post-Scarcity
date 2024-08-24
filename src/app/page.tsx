"use client"

import Image from "next/image";
import ResourceAllocationNetwork from '@/components/ResourceAllocationNetwork';
import DynamicResourceAllocationNetwork from '@/components/DynamicResourceAllocationNetwork';

export default function Home() {
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
}
