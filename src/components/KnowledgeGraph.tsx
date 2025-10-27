/**
 * Knowledge Graph Component
 * Interactive visualization of entities, relationships, and concepts
 * Features drag-and-drop nodes, zoom, and expandable details
 */
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ZoomIn, ZoomOut, Maximize2, Search, AlertCircle, RefreshCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface Node {
  id: string;
  label: string;
  type: 'person' | 'topic' | 'document' | 'action' | 'concept' | 'contradiction';
  x: number;
  y: number;
  connections: string[];
  contradiction?: boolean;
  summary?: string;
  predictedAction?: string;
}

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContradictions, setShowContradictions] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock data for knowledge graph with contradictions
  const nodes: Node[] = [
    { 
      id: '1', 
      label: 'Q4 Strategy', 
      type: 'topic', 
      x: 300, 
      y: 200, 
      connections: ['2', '3', '4', '9'],
      summary: 'Strategic planning for Q4 with focus on product launch and market expansion',
      predictedAction: 'Schedule stakeholder review meeting'
    },
    { 
      id: '2', 
      label: 'John Doe', 
      type: 'person', 
      x: 200, 
      y: 100, 
      connections: ['1', '5'] 
    },
    { 
      id: '3', 
      label: 'Product Launch', 
      type: 'action', 
      x: 400, 
      y: 100, 
      connections: ['1', '6'],
      predictedAction: 'Finalize launch timeline and marketing plan'
    },
    { 
      id: '4', 
      label: 'Market Analysis', 
      type: 'document', 
      x: 300, 
      y: 300, 
      connections: ['1', '7', '9'] 
    },
    { 
      id: '5', 
      label: 'Team Meeting', 
      type: 'topic', 
      x: 100, 
      y: 200, 
      connections: ['2'] 
    },
    { 
      id: '6', 
      label: 'Revenue Goals', 
      type: 'concept', 
      x: 500, 
      y: 200, 
      connections: ['3', '9'] 
    },
    { 
      id: '7', 
      label: 'Competitor Research', 
      type: 'concept', 
      x: 400, 
      y: 400, 
      connections: ['4'] 
    },
    { 
      id: '8', 
      label: 'Sarah Smith', 
      type: 'person', 
      x: 200, 
      y: 300, 
      connections: ['1'] 
    },
    {
      id: '9',
      label: 'Budget Contradiction',
      type: 'contradiction',
      x: 400, 
      y: 250,
      connections: ['1', '4', '6'],
      contradiction: true,
      summary: 'Q4 Strategy mentions $500K budget, but Market Analysis shows $450K allocation. Revenue Goals based on $500K assumption.'
    },
  ];

  const getNodeColor = (type: string) => {
    const colors = {
      person: '#3B82F6',
      topic: '#10B981',
      document: '#F59E0B',
      action: '#EF4444',
      concept: '#8B5CF6',
      contradiction: '#DC2626',
    };
    return colors[type as keyof typeof colors] || '#6B7280';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom
    ctx.save();
    ctx.scale(zoom, zoom);

    // Draw connections
    nodes.forEach((node) => {
      if (!showContradictions && node.type === 'contradiction') return;
      
      node.connections.forEach((connId) => {
        const targetNode = nodes.find((n) => n.id === connId);
        if (targetNode) {
          // Use red dashed line for contradiction connections
          if (node.contradiction || targetNode.contradiction) {
            ctx.strokeStyle = '#DC2626';
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 2.5;
          } else {
            ctx.strokeStyle = '#D1D5DB';
            ctx.setLineDash([]);
            ctx.lineWidth = 2;
          }
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        }
      });
    });
    
    ctx.setLineDash([]); // Reset dash

    // Draw nodes
    nodes.forEach((node) => {
      if (!showContradictions && node.type === 'contradiction') return;
      if (filterType !== 'all' && node.type !== filterType) return;
      if (searchTerm && !node.label.toLowerCase().includes(searchTerm.toLowerCase())) return;

      const isSelected = selectedNode?.id === node.id;
      const radius = isSelected ? 35 : 30;

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = getNodeColor(node.type);
      ctx.fill();
      
      if (isSelected) {
        ctx.strokeStyle = '#1F2937';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      // Draw warning indicator for contradictions
      if (node.contradiction) {
        ctx.beginPath();
        ctx.arc(node.x + 20, node.y - 20, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#FEF3C7';
        ctx.fill();
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw exclamation mark
        ctx.fillStyle = '#F59E0B';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('!', node.x + 20, node.y - 16);
      }

      // Draw label
      ctx.fillStyle = '#1F2937';
      ctx.font = node.contradiction ? 'bold 12px sans-serif' : '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 50);
    });

    ctx.restore();
  }, [zoom, selectedNode, filterType, searchTerm, showContradictions]);
  
  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Simulate graph update - in real app, this would fetch new data
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Trigger re-render with pulse effect
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    const clickedNode = nodes.find((node) => {
      const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
      return distance < 30;
    });

    setSelectedNode(clickedNode || null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-gray-900">Knowledge Graph</h2>
        <p className="text-gray-600 mt-1">
          Interactive visualization of entities, relationships, and concepts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Graph Area */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Network Visualization</CardTitle>
                <CardDescription>Click on nodes to view details</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setZoom(1)}
                  title="Reset Zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={autoRefresh ? "default" : "outline"}
                  size="icon" 
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  title="Toggle Auto-Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-[600px] border border-gray-200 rounded-lg cursor-pointer bg-gray-50"
            />
          </CardContent>
        </Card>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search nodes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Node Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="person">People</SelectItem>
                    <SelectItem value="topic">Topics</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="action">Actions</SelectItem>
                    <SelectItem value="concept">Concepts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Display Options</p>
                <div className="flex items-center justify-between py-2">
                  <Label htmlFor="show-contradictions" className="text-sm">
                    Show Contradictions
                  </Label>
                  <Switch
                    id="show-contradictions"
                    checked={showContradictions}
                    onCheckedChange={setShowContradictions}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Legend</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-600" />
                    <span className="text-sm">People</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-600" />
                    <span className="text-sm">Topics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-600" />
                    <span className="text-sm">Documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-600" />
                    <span className="text-sm">Actions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-600" />
                    <span className="text-sm">Concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-600 relative">
                      <AlertCircle className="w-3 h-3 text-orange-500 absolute -top-1 -right-1" />
                    </div>
                    <span className="text-sm">Contradictions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Node Details */}
          {selectedNode && (
            <Card className={selectedNode.contradiction ? 'border-red-300 bg-red-50' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Node Details
                  {selectedNode.contradiction && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Label</p>
                  <p className="text-gray-900">{selectedNode.label}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <Badge
                    className="mt-1"
                    style={{ backgroundColor: getNodeColor(selectedNode.type) }}
                  >
                    {selectedNode.type}
                  </Badge>
                </div>
                {selectedNode.summary && (
                  <div>
                    <p className="text-sm text-gray-600">AI Summary</p>
                    <p className="text-sm text-gray-900 mt-1 p-2 bg-white rounded border">
                      {selectedNode.summary}
                    </p>
                  </div>
                )}
                {selectedNode.predictedAction && (
                  <div>
                    <p className="text-sm text-gray-600">Predicted Next Action</p>
                    <p className="text-sm text-blue-700 mt-1 p-2 bg-blue-50 rounded border border-blue-200">
                      {selectedNode.predictedAction}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Connections</p>
                  <p className="text-gray-900">{selectedNode.connections.length} links</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Related Nodes</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedNode.connections.map((connId) => {
                      const node = nodes.find((n) => n.id === connId);
                      return node ? (
                        <Badge key={connId} variant="outline">
                          {node.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Full Details
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Graph Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Nodes</span>
                <span className="text-gray-900">{nodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Connections</span>
                <span className="text-gray-900">
                  {nodes.reduce((acc, n) => acc + n.connections.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Zoom Level</span>
                <span className="text-gray-900">{(zoom * 100).toFixed(0)}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
