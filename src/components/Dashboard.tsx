/**
 * Dashboard Component
 * Overview page showing key metrics, recent activities, and quick actions
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload, FileText, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Network } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import ProcessingStatus from './ProcessingStatus';
import RealTimeUpdates from './RealTimeUpdates';
import StatsCard from './StatsCard';
import AnimatedCard from './AnimatedCard';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'upload-sources' | 'knowledge-graph' | 'ai-insights' | 'analytics' | 'settings') => void;
  currentUser?: { name: string; email: string; role: string } | null;
}

export default function Dashboard({ onNavigate, currentUser }: DashboardProps) {
  const processingItems = [
    {
      id: '1',
      name: 'Q4_Strategy_Presentation.pdf',
      status: 'processing' as const,
      progress: 67,
      stage: 'Extracting entities and relationships',
    },
    {
      id: '2',
      name: 'Customer_Feedback_Audio.mp3',
      status: 'processing' as const,
      progress: 34,
      stage: 'Transcribing audio content',
    },
    {
      id: '3',
      name: 'Market_Analysis.xlsx',
      status: 'complete' as const,
      progress: 100,
      message: 'Successfully processed and added to knowledge graph',
    },
    {
      id: '4',
      name: 'Product_Requirements.docx',
      status: 'warning' as const,
      progress: 100,
      message: 'Contradiction detected: Budget estimates differ from Q4 Strategy',
    },
  ];

  const stats = [
    { title: 'Total Documents', value: '247', icon: FileText, change: '+12%', trend: 'up' },
    { title: 'Knowledge Nodes', value: '1,284', icon: Network, change: '+156', trend: 'up' },
    { title: 'AI Insights', value: '156', icon: TrendingUp, change: '+24%', trend: 'up' },
    { title: 'Processing Queue', value: '4', icon: Clock, change: '+2', trend: 'up' },
  ];

  const alerts = [
    {
      id: 1,
      type: 'contradiction',
      title: 'Budget Contradiction Detected',
      description: 'Q4 Strategy mentions $500K budget, but Market Analysis shows $450K allocation',
      sources: ['Q4 Strategy', 'Market Analysis'],
      severity: 'high',
    },
    {
      id: 2,
      type: 'redundancy',
      title: 'Redundant Topics Found',
      description: '3 documents discuss customer retention with overlapping content',
      sources: ['Customer Feedback', 'Sales Report', 'Product Requirements'],
      severity: 'medium',
    },
    {
      id: 3,
      type: 'unresolved',
      title: 'Unresolved Action Item',
      description: 'Stakeholder follow-up mentioned 3 times but no assigned owner',
      sources: ['Team Meeting Notes', 'Q4 Strategy'],
      severity: 'medium',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Q4 Strategy Meeting',
      type: 'Meeting',
      date: '2 hours ago',
      status: 'Processed',
    },
    {
      id: 2,
      title: 'Product Requirements Document',
      type: 'PDF',
      date: '5 hours ago',
      status: 'Analyzing',
    },
    {
      id: 3,
      title: 'Customer Feedback Report',
      type: 'Excel',
      date: '1 day ago',
      status: 'Complete',
    },
    {
      id: 4,
      title: 'Team Standup Recording',
      type: 'Audio',
      date: '2 days ago',
      status: 'Complete',
    },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Review Q4 meeting action items', priority: 'high', dueDate: 'Today' },
    { id: 2, task: 'Follow up on customer feedback', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, task: 'Update product roadmap', priority: 'low', dueDate: 'Oct 30' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-gray-900">Welcome back, {currentUser?.name || 'there'}</h2>
        <p className="text-gray-600 mt-1">Here's what's happening with your knowledge base today.</p>
      </div>

      {/* Stats Grid with Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Documents"
          value="247"
          change="+12% from last week"
          trend="up"
          icon={FileText}
          gradientColor="blue"
        />
        <StatsCard
          title="Knowledge Nodes"
          value="1,284"
          change="+156 new nodes"
          trend="up"
          icon={Network}
          gradientColor="green"
        />
        <StatsCard
          title="AI Insights"
          value="156"
          change="+24% this week"
          trend="up"
          icon={TrendingUp}
          gradientColor="purple"
        />
        <StatsCard
          title="Processing Queue"
          value="4"
          change="+2 items"
          trend="up"
          icon={Clock}
          gradientColor="orange"
        />
      </div>

      {/* AI Alerts & Notifications with Animation */}
      <AnimatedCard
        title="AI Alerts & Notifications"
        description="Issues detected across your knowledge base"
        className="border-orange-200 bg-gradient-to-br from-orange-50/50 to-orange-50/30"
        hoverable={false}
      >
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={alert.id} 
              className="p-4 bg-white border border-orange-200 rounded-lg card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                </div>
                <Badge 
                  variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                  className="animate-pulse-glow"
                >
                  {alert.severity}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {alert.sources.map((source, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities with Hover Effects */}
        <AnimatedCard
          title="Recent Activities"
          description="Latest uploads and processing status"
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg transition-all-smooth hover:border-blue-300 hover:bg-blue-50/30 group animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all-smooth">
                    <FileText className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-gray-900 group-hover:text-blue-900 transition-colors">{activity.title}</p>
                    <p className="text-sm text-gray-500">
                      {activity.type} • {activity.date}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={activity.status === 'Complete' ? 'default' : 'secondary'}
                  className="transition-transform group-hover:scale-105"
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* Processing Status & Tasks */}
        <div className="space-y-6">
          {/* Real-time Processing Status */}
          <ProcessingStatus items={processingItems} />
          
          {/* Quick Actions with Enhanced Buttons */}
          <AnimatedCard title="Quick Actions">
            <div className="space-y-3">
              <Button 
                className="w-full justify-start group hover:scale-[1.02] transition-transform" 
                variant="outline"
                onClick={() => onNavigate('upload-sources')}
              >
                <Upload className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Upload New Source
              </Button>
              <Button 
                className="w-full justify-start group hover:scale-[1.02] transition-transform" 
                variant="outline"
                onClick={() => onNavigate('knowledge-graph')}
              >
                <Network className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                View Knowledge Graph
              </Button>
              <Button 
                className="w-full justify-start group hover:scale-[1.02] transition-transform" 
                variant="outline"
                onClick={() => onNavigate('ai-insights')}
              >
                <TrendingUp className="w-4 h-4 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                Generate Insights
              </Button>
            </div>
          </AnimatedCard>

          {/* Real-Time Updates */}
          <RealTimeUpdates />

          {/* Upcoming Tasks with Interactive Elements */}
          <AnimatedCard
            title="Action Items"
            description="Tasks from recent meetings"
          >
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg transition-all-smooth hover:border-green-300 hover:bg-green-50/30 group cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 group-hover:text-green-600 transition-colors" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 group-hover:text-green-900 transition-colors">{task.task}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Storage Usage with Gradient Progress */}
      <AnimatedCard
        title="Storage Usage"
        description="42.3 GB of 100 GB used"
      >
        <div className="relative">
          <Progress value={42.3} className="h-3 bg-gray-100" />
          <div className="absolute inset-0 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" 
               style={{ width: '42.3%', opacity: 0.8 }} 
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600">Documents</p>
            <p className="text-sm text-gray-900 mt-1">18.5 GB</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <p className="text-xs text-gray-600">Audio</p>
            <p className="text-sm text-gray-900 mt-1">12.8 GB</p>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <p className="text-xs text-gray-600">Video</p>
            <p className="text-sm text-gray-900 mt-1">9.2 GB</p>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded-lg">
            <p className="text-xs text-gray-600">Other</p>
            <p className="text-sm text-gray-900 mt-1">1.8 GB</p>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}
