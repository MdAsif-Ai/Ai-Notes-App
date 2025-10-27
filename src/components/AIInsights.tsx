/**
 * AI Insights Component
 * AI-generated insights, recommendations, and semantic search interface
 * Supports context-aware responses and persona-based summaries
 */
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Lightbulb, Search, TrendingUp, AlertCircle, CheckCircle, Clock, User, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

export default function AIInsights() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPersona, setSelectedPersona] = useState('executive');
  const [isProcessing, setIsProcessing] = useState(false);

  const insights = [
    {
      id: 1,
      title: 'Budget Allocation Opportunity',
      description:
        'Analysis shows that reallocating 10% of Q4 marketing budget to digital channels could increase ROI by 25% based on historical data.',
      type: 'opportunity',
      confidence: 'high',
      sources: ['Q4 Strategy Meeting', 'Market Analysis Report'],
    },
    {
      id: 2,
      title: 'Risk: Timeline Dependency',
      description:
        'Product launch timeline has 3 critical dependencies that could delay release. Recommend creating contingency plans.',
      type: 'risk',
      confidence: 'high',
      sources: ['Product Development Sync', 'Project Timeline'],
    },
    {
      id: 3,
      title: 'Trend: Customer Feature Requests',
      description:
        'Mobile app features mentioned in 67% of customer feedback. Consider prioritizing mobile experience improvements.',
      type: 'trend',
      confidence: 'medium',
      sources: ['Customer Feedback Review', 'Support Tickets'],
    },
    {
      id: 4,
      title: 'Action: Follow-up Required',
      description:
        'John Doe mentioned following up with stakeholders 3 times across meetings but no action item created yet.',
      type: 'action',
      confidence: 'high',
      sources: ['Q4 Strategy Meeting', 'Team Sync'],
    },
  ];

  const predictedFollowUps = [
    {
      id: 1,
      task: 'Schedule Q4 budget review meeting',
      priority: 'high',
      suggestedDate: 'Oct 27, 2025',
      reasoning: 'Mentioned as needed by Sarah Smith in last strategy meeting',
    },
    {
      id: 2,
      task: 'Prepare competitor analysis presentation',
      priority: 'medium',
      suggestedDate: 'Oct 29, 2025',
      reasoning: 'Mike Johnson needs this for upcoming stakeholder review',
    },
    {
      id: 3,
      task: 'Review mobile app feature requests',
      priority: 'medium',
      suggestedDate: 'Nov 1, 2025',
      reasoning: 'Recurring theme in customer feedback over past 2 weeks',
    },
  ];

  const handleSearch = () => {
    // Mock search functionality with persona context
    if (query.trim()) {
      setIsProcessing(true);
      
      setTimeout(() => {
        setSearchResults([
          {
            title: 'Q4 Strategy Planning Meeting',
            snippet: getPersonaResponse(
              `Discussed ${query} in context of budget allocation and market expansion...`,
              selectedPersona
            ),
            relevance: 95,
            date: 'Oct 23, 2025',
            source: 'Meeting Transcript',
          },
          {
            title: 'Market Analysis Report',
            snippet: getPersonaResponse(
              `Key findings related to ${query} show significant opportunities in Q4...`,
              selectedPersona
            ),
            relevance: 87,
            date: 'Oct 20, 2025',
            source: 'PDF Document',
          },
          {
            title: 'Product Requirements Document',
            snippet: getPersonaResponse(
              `Section 3 covers ${query} requirements and technical specifications...`,
              selectedPersona
            ),
            relevance: 78,
            date: 'Oct 18, 2025',
            source: 'Word Document',
          },
        ]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const getPersonaResponse = (baseText: string, persona: string) => {
    switch (persona) {
      case 'executive':
        return `[Executive Summary] ${baseText} Strategic impact: High. Immediate action required.`;
      case 'analyst':
        return `[Data Analysis] ${baseText} Statistical confidence: 87%. Trend analysis shows positive correlation.`;
      case 'developer':
        return `[Technical Context] ${baseText} Implementation complexity: Medium. Estimated effort: 2-3 sprints.`;
      default:
        return baseText;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'risk':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'trend':
        return <Lightbulb className="w-5 h-5 text-blue-600" />;
      case 'action':
        return <CheckCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-gray-900">AI Insights</h2>
        <p className="text-gray-600 mt-1">
          Intelligent analysis and recommendations from your knowledge base
        </p>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="search">Semantic Search</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <CardDescription className="mt-1">{insight.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={insight.confidence === 'high' ? 'default' : 'secondary'}>
                        {insight.confidence} confidence
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {insight.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {insight.sources.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-2">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Semantic Search Tab */}
        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Context-Aware AI Search
              </CardTitle>
              <CardDescription>
                Natural language search with persona-based responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="persona-select" className="text-sm text-gray-600 mb-2 block">
                  Response Persona
                </Label>
                <Select value={selectedPersona} onValueChange={setSelectedPersona}>
                  <SelectTrigger id="persona-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Executive (Strategic focus)
                      </div>
                    </SelectItem>
                    <SelectItem value="analyst">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Analyst (Data-driven insights)
                      </div>
                    </SelectItem>
                    <SelectItem value="developer">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Developer (Technical details)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Ask anything about your knowledge base..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-3 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-900">
                      Search Results ({searchResults.length})
                    </h3>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {selectedPersona}
                    </Badge>
                  </div>
                  {searchResults.map((result, idx) => (
                    <div key={idx} className="p-4 border border-blue-200 bg-blue-50/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-gray-900">{result.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {result.source} • {result.date}
                          </p>
                        </div>
                        <Badge className="bg-blue-600">{result.relevance}% match</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mt-2 p-3 bg-white rounded border border-blue-100">
                        {result.snippet}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Source
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.length === 0 && query === '' && (
                <div className="text-center py-12 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Enter a search query to find relevant information</p>
                  <p className="text-sm mt-2">Try: "What are our Q4 priorities?"</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'What are the main risks in our Q4 strategy?',
                  'Show me all action items from last week',
                  'What did customers say about mobile features?',
                  'Summarize budget discussions from recent meetings',
                ].map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start text-left h-auto py-3"
                    onClick={() => {
                      setQuery(suggestion);
                      handleSearch();
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Predicted Follow-ups</CardTitle>
              <CardDescription>
                AI-suggested next actions based on meeting patterns and discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {predictedFollowUps.map((followUp) => (
                  <div key={followUp.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900">{followUp.task}</h4>
                      <Badge
                        variant={followUp.priority === 'high' ? 'destructive' : 'secondary'}
                      >
                        {followUp.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Clock className="w-4 h-4" />
                      Suggested: {followUp.suggestedDate}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{followUp.reasoning}</p>
                    <div className="flex gap-2">
                      <Button size="sm">Create Action Item</Button>
                      <Button size="sm" variant="outline">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pattern Analysis</CardTitle>
              <CardDescription>Recurring themes and patterns in your meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Budget Planning</h4>
                  <p className="text-sm text-gray-600">
                    Mentioned in 5 out of 7 recent meetings. Trend increasing.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Product Launch Timeline</h4>
                  <p className="text-sm text-gray-600">
                    Discussed across 4 teams. High cross-functional interest.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="text-gray-900 mb-1">Customer Feedback Integration</h4>
                  <p className="text-sm text-gray-600">
                    Recurring topic. Last addressed 3 days ago.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
