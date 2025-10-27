/**
 * Animated Card Component
 * Enhanced card with hover effects and micro-interactions
 */
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface AnimatedCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: 'blue' | 'green' | 'orange' | 'purple';
}

export default function AnimatedCard({
  title,
  description,
  children,
  className = '',
  hoverable = true,
  glowColor,
}: AnimatedCardProps) {
  const glowClass = glowColor
    ? `hover:shadow-lg hover:shadow-${glowColor}-500/20`
    : '';

  return (
    <Card
      className={`
        ${hoverable ? 'card-hover' : ''} 
        ${glowClass}
        ${className}
        transition-all-smooth
      `}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={!title && !description ? 'p-6' : ''}>
        {children}
      </CardContent>
    </Card>
  );
}
