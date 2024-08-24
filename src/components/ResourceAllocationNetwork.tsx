import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ForceGraph2D } from 'react-force-graph';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

// pH scale colors
const pHColors: string[] = [
  '#FF0000', // 0 (most acidic)
  '#FF4500',
  '#FFA500',
  '#FFD700',
  '#FFFF00',
  '#ADFF2F',
  '#00FF00', // 7 (neutral)
  '#00FFFF',
  '#0000FF',
  '#4B0082',
  '#8B00FF',
  '#9400D3',
  '#8A2BE2', // 14 (most basic)
];

const mapValueToColor = (value: number, min: number, max: number): string => {
  const normalizedValue = (value - min) / (max - min);
  const colorIndex = Math.floor(normalizedValue * (pHColors.length - 1));
  return pHColors[colorIndex];
};

interface Node {
  id: number;
  energy: number;
  water: number;
  food: number;
  energyChange: number;
  waterChange: number;
  foodChange: number;
}

interface Link {
  source: number;
  target: number;
  energy: number;
  water: number;
  food: number;
  energyChange: number;
  waterChange: number;
  foodChange: number;
}

type ResourceType = 'energy' | 'water' | 'food';

const DynamicResourceAllocationNetwork: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedResource, setSelectedResource] = useState<ResourceType>('energy');
  const [demandChange, setDemandChange] = useState<number>(0);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  // Initialize network
  useEffect(() => {
    const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      energy: 100,
      water: 100,
      food: 100,
      energyChange: 0,
      waterChange: 0,
      foodChange: 0,
    }));
    
    const initialLinks: Link[] = [];
    for (let i = 0; i < initialNodes.length; i++) {
      for (let j = i + 1; j < initialNodes.length; j++) {
        if (Math.random() < 0.3) { // 30% chance of connection
          initialLinks.push({
            source: i,
            target: j,
            energy: 0,
            water: 0,
            food: 0,
            energyChange: 0,
            waterChange: 0,
            foodChange: 0,
          });
        }
      }
    }

    setNodes(initialNodes);
    setLinks(initialLinks);
  }, []);

  const updateNetwork = useCallback(() => {
    setNodes(prevNodes => {
      const newNodes = [...prevNodes];
      const nodeToUpdate = Math.floor(Math.random() * newNodes.length);
      const changeAmount = Math.random() * 20 - 10; // Random change between -10 and 10

      newNodes[nodeToUpdate][selectedResource] += changeAmount;
      newNodes[nodeToUpdate][`${selectedResource}Change` as keyof Node] = changeAmount;

      // Calculate total resource in the network
      const totalResource = newNodes.reduce((sum, node) => sum + node[selectedResource], 0);
      const averageResource = totalResource / newNodes.length;

      // Redistribute excess/deficit
      newNodes.forEach((node, index) => {
        if (index !== nodeToUpdate) {
          const diff = averageResource - node[selectedResource];
          node[selectedResource] += diff * 0.1; // Gradual adjustment
          node[`${selectedResource}Change` as keyof Node] = diff * 0.1;
        }
      });

      return newNodes;
    });

    setLinks(prevLinks => {
      return prevLinks.map(link => {
        const sourceNode = nodes.find(node => node.id === link.source);
        const targetNode = nodes.find(node => node.id === link.target);
        if (sourceNode && targetNode) {
          const diff = sourceNode[selectedResource] - targetNode[selectedResource];
          link[selectedResource] = diff * 0.05; // Flow direction indicated by sign
          link[`${selectedResource}Change` as keyof Link] = diff * 0.05;
        }
        return link;
      });
    });
  }, [nodes, selectedResource]);

  useEffect(() => {
    const interval = setInterval(updateNetwork, 1000); // 60 changes per minute
    return () => clearInterval(interval);
  }, [updateNetwork]);

  const nodeColor = useCallback((node: Node) => {
    const change = node[`${selectedResource}Change` as keyof Node] as number;
    const color = mapValueToColor(change, -10, 10);
    const opacity = Math.min(Math.abs(change) / 10, 1);
    return `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  }, [selectedResource]);

  const linkColor = useCallback((link: Link) => {
    const change = link[`${selectedResource}Change` as keyof Link] as number;
    const color = mapValueToColor(change, -10, 10);
    const opacity = Math.min(Math.abs(change) / 10, 1);
    return `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  }, [selectedResource]);

  return (
    <div>
      <h2>Dynamic Resource Allocation Network</h2>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Resource Allocation Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select<ResourceType> onValueChange={setSelectedResource} placeholder="Select resource">
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
          <Button onClick={updateNetwork} disabled={selectedNode === null}>
            Update Network
          </Button>
          <div style={{ height: '500px', marginTop: '20px' }}>
            <ForceGraph2D
              graphData={{ nodes, links }}
              nodeLabel={(node: Node) => `Node ${node.id}: ${selectedResource} = ${node[selectedResource].toFixed(2)}`}
              linkLabel={(link: Link) => `${selectedResource} flow: ${link[selectedResource].toFixed(2)}`}
              nodeColor={(node: Node) => 
                node.id === selectedNode ? 'red' : 
                node[selectedResource] > 100 ? 'green' : 
                node[selectedResource] < 100 ? 'orange' : 
                'blue'
              }
              linkColor={(link: Link) => 
                link[selectedResource] > 0 ? 'green' : 
                link[selectedResource] < 0 ? 'red' : 
                'gray'
              }
              linkDirectionalParticles={2}
              linkDirectionalParticleSpeed={(d: Link) => Math.abs(d[selectedResource]) * 0.01}
              onNodeClick={(node: Node) => setSelectedNode(node.id)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicResourceAllocationNetwork;



// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Slider } from "./ui/slider";
// import { Button } from "./ui/button";
// import { Select, SelectItem } from "./ui/select";
// import { ForceGraph2D } from 'react-force-graph';

// const ResourceAllocationNetwork = () => {
//   const [nodes, setNodes] = useState([]);
//   const [links, setLinks] = useState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [selectedResource, setSelectedResource] = useState('energy');
//   const [demandChange, setDemandChange] = useState(0);

//   // Initialize network
//   useEffect(() => {
//     const initialNodes = Array.from({ length: 10 }, (_, i) => ({
//       id: i,
//       energy: 100,
//       water: 100,
//       food: 100,
//     }));
    
//     const initialLinks = [];
//     for (let i = 0; i < initialNodes.length; i++) {
//       for (let j = i + 1; j < initialNodes.length; j++) {
//         if (Math.random() < 0.3) { // 30% chance of connection
//           initialLinks.push({
//             source: i,
//             target: j,
//             energy: 0,
//             water: 0,
//             food: 0,
//           });
//         }
//       }
//     }

//     setNodes(initialNodes);
//     setLinks(initialLinks);
//   }, []);

//   const updateNetwork = () => {
//     if (!selectedNode) return;

//     const newNodes = [...nodes];
//     const newLinks = [...links];

//     // Update selected node's resource
//     newNodes[selectedNode][selectedResource] += demandChange;

//     // Calculate total resource in the network
//     const totalResource = newNodes.reduce((sum, node) => sum + node[selectedResource], 0);
//     const averageResource = totalResource / newNodes.length;

//     // Redistribute excess/deficit
//     newNodes.forEach((node, index) => {
//       if (index !== selectedNode) {
//         const diff = averageResource - node[selectedResource];
//         node[selectedResource] += diff * 0.1; // Gradual adjustment

//         // Update links
//         newLinks.forEach(link => {
//           if (link.source === index || link.target === index) {
//             link[selectedResource] = diff * 0.05; // Flow direction indicated by sign
//           }
//         });
//       }
//     });

//     setNodes(newNodes);
//     setLinks(newLinks);
//   };

//   return (
//     <div>
//       <h2>Static Resource Allocation Network</h2>
//       {/* <Card className="w-full max-w-4xl mx-auto">
//         <CardHeader>
//           <CardTitle>Resource Allocation Network</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-4">
//             <Select onValueChange={value => setSelectedResource(value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select resource" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="energy">Energy</SelectItem>
//                 <SelectItem value="water">Water</SelectItem>
//                 <SelectItem value="food">Food</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="mb-4">
//             <p>Demand Change: {demandChange}</p>
//             <Slider
//               value={[demandChange]}
//               min={-50}
//               max={50}
//               step={1}
//               onValueChange={([value]) => setDemandChange(value)}
//             />
//           </div>
//           <Button onClick={updateNetwork} disabled={!selectedNode}>
//             Update Network
//           </Button>
//           <div style={{ height: '500px', marginTop: '20px' }}>
//             <ForceGraph2D
//               graphData={{ nodes, links }}
//               nodeLabel={node => `Node ${node.id}: ${selectedResource} = ${node[selectedResource].toFixed(2)}`}
//               linkLabel={link => `${selectedResource} flow: ${link[selectedResource].toFixed(2)}`}
//               nodeColor={node => 
//                 node.id === selectedNode ? 'red' : 
//                 node[selectedResource] > 100 ? 'green' : 
//                 node[selectedResource] < 100 ? 'orange' : 
//                 'blue'
//               }
//               linkColor={link => 
//                 link[selectedResource] > 0 ? 'green' : 
//                 link[selectedResource] < 0 ? 'red' : 
//                 'gray'
//               }
//               linkDirectionalParticles={2}
//               linkDirectionalParticleSpeed={d => Math.abs(d[selectedResource]) * 0.01}
//               onNodeClick={node => setSelectedNode(node.id)}
//             />
//           </div>
//         </CardContent>
//       </Card> */}
//       <div style={{ height: '500px', marginTop: '20px' }}>
//             <ForceGraph2D
//               graphData={{ nodes, links }}
//               nodeLabel={node => `Node ${node.id}: ${selectedResource} = ${node[selectedResource].toFixed(2)}`}
//               linkLabel={link => `${selectedResource} flow: ${link[selectedResource].toFixed(2)}`}
//               nodeColor={node => 
//                 node.id === selectedNode ? 'red' : 
//                 node[selectedResource] > 100 ? 'green' : 
//                 node[selectedResource] < 100 ? 'orange' : 
//                 'blue'
//               }
//               linkColor={link => 
//                 link[selectedResource] > 0 ? 'green' : 
//                 link[selectedResource] < 0 ? 'red' : 
//                 'gray'
//               }
//               linkDirectionalParticles={2}
//               linkDirectionalParticleSpeed={d => Math.abs(d[selectedResource]) * 0.01}
//               onNodeClick={node => setSelectedNode(node.id)}
//             />
//           </div>
//     </div>
//   );
// };

// export default ResourceAllocationNetwork;