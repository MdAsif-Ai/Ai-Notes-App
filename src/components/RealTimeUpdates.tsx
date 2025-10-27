/**
 * Real-Time Updates Component
 * Shows live processing updates and knowledge graph changes
 */
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Network, FileText, Users, TrendingUp, Zap } from 'lucide-react';

interface Update {
  id: string;
  type: 'graph' | 'document' | 'insight' | 'connection';
  message: string;
  timestamp: Date;
}

export default function RealTimeUpdates() {
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: '1',
      type: 'graph',
      message: '8 new connections added to knowledge graph',
      timestamp: new Date(Date.now() - 2000),
    },
    {
      id: '2',
      type: 'document',
      message: 'Q4_Strategy.pdf processing complete',
      timestamp: new Date(Date.now() - 5000),
    },
    {
      id: '3',
      type: 'insight',
      message: 'New contradiction detected between documents',
      timestamp: new Date(Date.now() - 8000),
    },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newUpdate: Update = {
        id: Date.now().toString(),
        type: ['graph', 'document', 'insight', 'connection'][Math.floor(Math.random() * 4)] as Update['type'],
        message: getRandomMessage(),
        timestamp: new Date(),
      };

      setUpdates((prev) => [newUpdate, ...prev.slice(0, 4)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getRandomMessage = () => {
    const messages = [
      'Knowledge graph updated with new entities',
      'Document analysis complete',
      'New relationship discovered between topics',
      'Sentiment analysis updated',
      'Action items extracted from latest upload',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getIcon = (type: Update['type']) => {
    switch (type) {
      case 'graph':
        return <Network className="w-4 h-4 text-blue-600" />;
      case 'document':
        return <FileText className="w-4 h-4 text-green-600" />;
      case 'insight':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'connection':
        return <Zap className="w-4 h-4 text-orange-600" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          Live Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {updates.map((update) => (
            <div
              key={update.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg animate-in fade-in slide-in-from-top-2"
            >
              <div className="mt-0.5">{getIcon(update.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{update.message}</p>
                <p className="text-xs text-gray-500 mt-1">{getTimeAgo(update.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
