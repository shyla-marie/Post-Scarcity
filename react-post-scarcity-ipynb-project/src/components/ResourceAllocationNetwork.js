import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Select, SelectItem } from "./ui/select";
import { ForceGraph2D } from 'react-force-graph';

const ResourceAllocationNetwork = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedResource, setSelectedResource] = useState('energy');
  const [demandChange, setDemandChange] = useState(0);

  // Initialize network
  useEffect(() => {
    const initialNodes = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      energy: 100,
      water: 100,
      food: 100,
    }));
    
    const initialLinks = [];
    for (let i = 0; i < initialNodes.length; i++) {
      for (let j = i + 1; j < initialNodes.length; j++) {
        if (Math.random() < 0.3) { // 30% chance of connection
          initialLinks.push({
            source: i,
            target: j,
            energy: 0,
            water: 0,
            food: 0,
          });
        }
      }
    }

    setNodes(initialNodes);
    setLinks(initialLinks);
  }, []);

  const updateNetwork = () => {
    if (!selectedNode) return;

    const newNodes = [...nodes];
    const newLinks = [...links];

    // Update selected node's resource
    newNodes[selectedNode][selectedResource] += demandChange;

    // Calculate total resource in the network
    const totalResource = newNodes.reduce((sum, node) => sum + node[selectedResource], 0);
    const averageResource = totalResource / newNodes.length;

    // Redistribute excess/deficit
    newNodes.forEach((node, index) => {
      if (index !== selectedNode) {
        const diff = averageResource - node[selectedResource];
        node[selectedResource] += diff * 0.1; // Gradual adjustment

        // Update links
        newLinks.forEach(link => {
          if (link.source === index || link.target === index) {
            link[selectedResource] = diff * 0.05; // Flow direction indicated by sign
          }
        });
      }
    });

    setNodes(newNodes);
    setLinks(newLinks);
  };

  return (
    <div>
      <h2>Static Resource Allocation Network</h2>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Resource Allocation Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={value => setSelectedResource(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <p>Demand Change: {demandChange}</p>
            <Slider
              value={[demandChange]}
              min={-50}
              max={50}
              step={1}
              onValueChange={([value]) => setDemandChange(value)}
            />
          </div>
          <Button onClick={updateNetwork} disabled={!selectedNode}>
            Update Network
          </Button>
          <div style={{ height: '500px', marginTop: '20px' }}>
            <ForceGraph2D
              graphData={{ nodes, links }}
              nodeLabel={node => `Node ${node.id}: ${selectedResource} = ${node[selectedResource].toFixed(2)}`}
              linkLabel={link => `${selectedResource} flow: ${link[selectedResource].toFixed(2)}`}
              nodeColor={node => 
                node.id === selectedNode ? 'red' : 
                node[selectedResource] > 100 ? 'green' : 
                node[selectedResource] < 100 ? 'orange' : 
                'blue'
              }
              linkColor={link => 
                link[selectedResource] > 0 ? 'green' : 
                link[selectedResource] < 0 ? 'red' : 
                'gray'
              }
              linkDirectionalParticles={2}
              linkDirectionalParticleSpeed={d => Math.abs(d[selectedResource]) * 0.01}
              onNodeClick={node => setSelectedNode(node.id)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceAllocationNetwork;