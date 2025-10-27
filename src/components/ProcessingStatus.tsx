/**
 * Processing Status Component
 * Real-time AI processing status widget with live updates
 */
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ProcessingItem {
  id: string;
  name: string;
  status: 'queued' | 'processing' | 'complete' | 'warning' | 'error';
  progress: number;
  stage?: string;
  message?: string;
}

interface ProcessingStatusProps {
  items: ProcessingItem[];
}

export default function ProcessingStatus({ items }: ProcessingStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'complete':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (items.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          AI Processing Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-3 border rounded-lg ${getStatusColor(item.status)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  {getStatusIcon(item.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.name}</p>
                    {item.stage && (
                      <p className="text-xs mt-1 opacity-80">{item.stage}</p>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs capitalize">
                  {item.status}
                </Badge>
              </div>
              
              {item.status === 'processing' && (
                <Progress value={item.progress} className="h-1 mt-2" />
              )}
              
              {item.message && (
                <p className="text-xs mt-2 opacity-80">{item.message}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
