import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ForceGraph2D } from 'react-force-graph';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "./ui/select";


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
          <CardTitle>Dynamic Resource Allocation Network</CardTitle>
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
          <div style={{ height: '500px', marginTop: '20px' }}>
            <ForceGraph2D
              graphData={{ nodes, links }}
              nodeLabel={(node: Node) => `Node ${node.id}: ${selectedResource} = ${node[selectedResource].toFixed(2)}, Change = ${node[`${selectedResource}Change` as keyof Node].toFixed(2)}`}
              linkLabel={(link: Link) => `${selectedResource} flow: ${link[selectedResource].toFixed(2)}, Change = ${link[`${selectedResource}Change` as keyof Link].toFixed(2)}`}
              nodeColor={nodeColor}
              linkColor={linkColor}
              linkDirectionalParticles={2}
              linkDirectionalParticleSpeed={(d: Link) => Math.abs(d[selectedResource]) * 0.01}
              nodeRelSize={8}
              linkWidth={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicResourceAllocationNetwork;








// import React, { useState, useEffect, useCallback } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Select, SelectItem } from "./ui/select";
// import { ForceGraph2D } from 'react-force-graph';

// // pH scale colors
// const pHColors = [
//   '#FF0000', // 0 (most acidic)
//   '#FF4500',
//   '#FFA500',
//   '#FFD700',
//   '#FFFF00',
//   '#ADFF2F',
//   '#00FF00', // 7 (neutral)
//   '#00FFFF',
//   '#0000FF',
//   '#4B0082',
//   '#8B00FF',
//   '#9400D3',
//   '#8A2BE2', // 14 (most basic)
// ];

// const mapValueToColor = (value, min, max) => {
//   const normalizedValue = (value - min) / (max - min);
//   const colorIndex = Math.floor(normalizedValue * (pHColors.length - 1));
//   return pHColors[colorIndex];
// };

// const DynamicResourceAllocationNetwork = () => {
//   const [nodes, setNodes] = useState([]);
//   const [links, setLinks] = useState([]);
//   const [selectedResource, setSelectedResource] = useState('energy');

//   // Initialize network
//   useEffect(() => {
//     const initialNodes = Array.from({ length: 10 }, (_, i) => ({
//       id: i,
//       energy: 100,
//       water: 100,
//       food: 100,
//       energyChange: 0,
//       waterChange: 0,
//       foodChange: 0,
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
//             energyChange: 0,
//             waterChange: 0,
//             foodChange: 0,
//           });
//         }
//       }
//     }

//     setNodes(initialNodes);
//     setLinks(initialLinks);
//   }, []);

//   const updateNetwork = useCallback(() => {
//     setNodes(prevNodes => {
//       const newNodes = [...prevNodes];
//       const nodeToUpdate = Math.floor(Math.random() * newNodes.length);
//       const changeAmount = Math.random() * 20 - 10; // Random change between -10 and 10

//       newNodes[nodeToUpdate][selectedResource] += changeAmount;
//       newNodes[nodeToUpdate][`${selectedResource}Change`] = changeAmount;

//       // Calculate total resource in the network
//       const totalResource = newNodes.reduce((sum, node) => sum + node[selectedResource], 0);
//       const averageResource = totalResource / newNodes.length;

//       // Redistribute excess/deficit
//       newNodes.forEach((node, index) => {
//         if (index !== nodeToUpdate) {
//           const diff = averageResource - node[selectedResource];
//           node[selectedResource] += diff * 0.1; // Gradual adjustment
//           node[`${selectedResource}Change`] = diff * 0.1;
//         }
//       });

//       return newNodes;
//     });

//     setLinks(prevLinks => {
//       return prevLinks.map(link => {
//         const sourceNode = nodes[link.source];
//         const targetNode = nodes[link.target];
//         const diff = sourceNode[selectedResource] - targetNode[selectedResource];
//         link[selectedResource] = diff * 0.05; // Flow direction indicated by sign
//         link[`${selectedResource}Change`] = diff * 0.05;
//         return link;
//       });
//     });
//   }, [nodes, selectedResource]);

//   useEffect(() => {
//     const interval = setInterval(updateNetwork, 1000); // 60 changes per minute
//     return () => clearInterval(interval);
//   }, [updateNetwork]);

//   const nodeColor = useCallback((node) => {
//     const change = node[`${selectedResource}Change`];
//     const color = mapValueToColor(change, -10, 10);
//     const opacity = Math.min(Math.abs(change) / 10, 1);
//     return `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
//   }, [selectedResource]);

//   const linkColor = useCallback((link) => {
//     const change = link[`${selectedResource}Change`];
//     const color = mapValueToColor(change, -10, 10);
//     const opacity = Math.min(Math.abs(change) / 10, 1);
//     return `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
//   }, [selectedResource]);

//   return (
//     <div>
//       <h2>Dynamic Resource Allocation Network</h2>
//       <Card className="w-full max-w-4xl mx-auto">
//         <CardHeader>
//           <CardTitle>Dynamic Resource Allocation Network</CardTitle>
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
//           <div style={{ height: '500px', marginTop: '20px' }}>
//             <ForceGraph2D
//               graphData={{ nodes, links }}
//               nodeLabel={node => `Node ${node.id}: ${selectedResource} = ${node[selectedResource].toFixed(2)}, Change = ${node[`${selectedResource}Change`].toFixed(2)}`}
//               linkLabel={link => `${selectedResource} flow: ${link[selectedResource].toFixed(2)}, Change = ${link[`${selectedResource}Change`].toFixed(2)}`}
//               nodeColor={nodeColor}
//               linkColor={linkColor}
//               linkDirectionalParticles={2}
//               linkDirectionalParticleSpeed={d => Math.abs(d[selectedResource]) * 0.01}
//               nodeRelSize={8}
//               linkWidth={2}
//             />
//           </div>
//         </CardContent>
//       </Card>
//       <div style={{ height: '500px', marginTop: '20px' }}>
//             <ForceGraph2D
//               graphData={{ nodes, links }}
//               nodeLabel={node => `Node ${node.id}: ${selectedResource} = ${node[selectedResource].toFixed(2)}, Change = ${node[`${selectedResource}Change`].toFixed(2)}`}
//               linkLabel={link => `${selectedResource} flow: ${link[selectedResource].toFixed(2)}, Change = ${link[`${selectedResource}Change`].toFixed(2)}`}
//               nodeColor={nodeColor}
//               linkColor={linkColor}
//               linkDirectionalParticles={2}
//               linkDirectionalParticleSpeed={d => Math.abs(d[selectedResource]) * 0.01}
//               nodeRelSize={8}
//               linkWidth={2}
//             />
//           </div>
//     </div>
//   );
// };

// export default DynamicResourceAllocationNetwork;