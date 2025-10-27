/**
 * Stats Card Component
 * Animated statistics card with icon and trend indicator
 */
import { ReactNode } from 'react';
import { Card, CardContent } from './ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  gradientColor?: 'blue' | 'green' | 'orange' | 'purple';
}

export default function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  gradientColor = 'blue',
}: StatsCardProps) {
  const gradientClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <Card className="card-hover overflow-hidden relative group">
      {/* Animated gradient background on hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${gradientClasses[gradientColor]} 
        opacity-0 group-hover:opacity-5 transition-opacity duration-300
      `} />
      
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-gray-900 mt-2 animate-slide-up">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-1">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span
                  className={`text-sm ${
                    trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {change}
                </span>
              </div>
            )}
          </div>
          <div className={`
            w-14 h-14 rounded-xl bg-gradient-to-br ${gradientClasses[gradientColor]}
            flex items-center justify-center
            transform group-hover:scale-110 transition-transform duration-300
            shadow-lg
          `}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
