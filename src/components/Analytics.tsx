/**
 * Analytics Component
 * Dashboard showing sentiment analysis, engagement metrics, and actionable insights
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Users, MessageSquare, Target, Activity } from 'lucide-react';

export default function Analytics() {
  const sentimentData = [
    { name: 'Mon', positive: 65, neutral: 25, negative: 10 },
    { name: 'Tue', positive: 70, neutral: 20, negative: 10 },
    { name: 'Wed', positive: 55, neutral: 30, negative: 15 },
    { name: 'Thu', positive: 75, neutral: 20, negative: 5 },
    { name: 'Fri', positive: 68, neutral: 22, negative: 10 },
  ];

  const engagementData = [
    { name: 'John Doe', participation: 85, influence: 78 },
    { name: 'Sarah Smith', participation: 92, influence: 88 },
    { name: 'Mike Johnson', participation: 78, influence: 72 },
    { name: 'Alice Wang', participation: 88, influence: 85 },
    { name: 'Bob Chen', participation: 75, influence: 68 },
  ];

  const topicDistribution = [
    { name: 'Strategy', value: 35, color: '#3B82F6' },
    { name: 'Product', value: 28, color: '#10B981' },
    { name: 'Customer', value: 20, color: '#F59E0B' },
    { name: 'Operations', value: 17, color: '#EF4444' },
  ];

  const actionItemsData = [
    { week: 'Week 1', created: 12, completed: 10 },
    { week: 'Week 2', created: 15, completed: 13 },
    { week: 'Week 3', created: 18, completed: 15 },
    { week: 'Week 4', created: 14, completed: 12 },
  ];

  const stats = [
    {
      title: 'Avg Sentiment',
      value: '+68%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Participation Rate',
      value: '84%',
      change: '+12%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Topics Discussed',
      value: '47',
      change: '-3%',
      trend: 'down',
      icon: MessageSquare,
    },
    {
      title: 'Action Items',
      value: '23',
      change: '+8%',
      trend: 'up',
      icon: Target,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-gray-900">Analytics</h2>
        <p className="text-gray-600 mt-1">
          Insights and metrics from your meetings and knowledge base
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="sentiment" className="w-full">
        <TabsList>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
        </TabsList>

        {/* Sentiment Analysis Tab */}
        <TabsContent value="sentiment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trends</CardTitle>
              <CardDescription>Emotional tone analysis across meetings this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" fill="#10B981" />
                  <Bar dataKey="neutral" fill="#6B7280" />
                  <Bar dataKey="negative" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <p className="text-green-600">68%</p>
                  </div>
                  <Badge className="bg-green-600">Positive</Badge>
                  <p className="text-sm text-gray-600 mt-2">Trend: Improving</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Positive Meeting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900">Customer Feedback Review</p>
                <p className="text-sm text-gray-600 mt-1">Oct 21, 2025</p>
                <Badge className="mt-3 bg-green-600">92% Positive</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emotion Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enthusiasm</span>
                  <span className="text-gray-900">45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Confidence</span>
                  <span className="text-gray-900">32%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Concern</span>
                  <span className="text-gray-900">15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uncertainty</span>
                  <span className="text-gray-900">8%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Influence & Participation</CardTitle>
              <CardDescription>Analysis of participant engagement levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participation" fill="#3B82F6" />
                  <Bar dataKey="influence" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>Based on speaking time and decision influence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {engagementData
                    .sort((a, b) => b.influence - a.influence)
                    .slice(0, 3)
                    .map((person, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-gray-900">{person.name}</span>
                        <Badge>{person.influence}% influence</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Speaking Time</span>
                  <span className="text-gray-900">12m 34s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Asked</span>
                  <span className="text-gray-900">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Decisions Made</span>
                  <span className="text-gray-900">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Follow-up Actions</span>
                  <span className="text-gray-900">18</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic Distribution</CardTitle>
                <CardDescription>Most discussed topics this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topicDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} (${entry.value}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topicDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Topics gaining attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-gray-900">Q4 Budget Planning</p>
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">+45% mentions vs last week</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-gray-900">Product Launch</p>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">+32% mentions vs last week</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-gray-900">Mobile Features</p>
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                    </div>
                    <p className="text-sm text-gray-600">+28% mentions vs last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Productivity Tab */}
        <TabsContent value="productivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Action Items Tracking</CardTitle>
              <CardDescription>Creation vs completion rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={actionItemsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="created" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-gray-900">86%</p>
                  <p className="text-sm text-gray-600 mt-1">This month</p>
                  <Badge className="mt-3 bg-green-600">+8% vs last month</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg Time to Complete</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-gray-900">3.2 days</p>
                  <p className="text-sm text-gray-600 mt-1">Per action item</p>
                  <Badge className="mt-3 bg-blue-600">-0.5 days improvement</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overdue Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-gray-900">5</p>
                  <p className="text-sm text-gray-600 mt-1">Need attention</p>
                  <Badge className="mt-3" variant="destructive">
                    2 critical
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
