
import React from 'react';

interface FlowchartNode {
  id: string;
  text: string;
  type: string;
  next: string[];
}

interface LcaFlowchartProps {
  nodes: FlowchartNode[];
}

// LCA model flowchart node type styles
const nodeStyles = {
  input: "bg-blue-100 border-blue-500",
  process: "bg-gray-100 border-gray-500",
  output: "bg-green-100 border-green-500"
};

export const LcaFlowchart: React.FC<LcaFlowchartProps> = ({ nodes }) => {
  return (
    <div className="mt-4 relative">
      <div className="flex flex-col items-center space-y-5 relative">
        {nodes.map((node, index) => (
          <div key={node.id} className="relative w-full">
            <div className={`w-64 mx-auto p-3 rounded-lg border ${nodeStyles[node.type as keyof typeof nodeStyles]} relative z-10`}>
              <div className="text-center">{node.text}</div>
            </div>
            
            {/* Connection lines */}
            {node.next.length > 0 && (
              <div className="absolute left-1/2 top-full h-5 w-0.5 bg-gray-300 -translate-x-1/2 z-0"></div>
            )}
            
            {/* Branch connection lines */}
            {node.next.length > 1 && (
              <div className="absolute top-full pt-5 left-1/2 -translate-x-1/2 flex justify-center w-full">
                <div className="flex items-center justify-between" style={{width: `${(node.next.length-1) * 80 + 20}px`}}>
                  {node.next.map(nextId => (
                    <div key={nextId} className="h-5 w-0.5 bg-gray-300"></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LcaFlowchart;
