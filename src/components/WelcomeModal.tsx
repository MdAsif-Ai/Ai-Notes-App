/**
 * Welcome Modal Component
 * Introductory modal showing key features and getting started guide
 */
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Upload, Network, Lightbulb, BarChart3, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to AI Knowledge Hub',
      description: 'Your intelligent platform for managing multi-source knowledge and generating AI-powered insights',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Multi-Source Upload',
      description: 'Upload PDFs, documents, images, audio, video, and more. Our AI processes everything automatically.',
      icon: Upload,
      color: 'from-green-500 to-teal-600',
    },
    {
      title: 'Knowledge Graph',
      description: 'Visualize connections between concepts, detect contradictions, and explore relationships dynamically.',
      icon: Network,
      color: 'from-orange-500 to-pink-600',
    },
    {
      title: 'AI Insights',
      description: 'Get persona-based summaries, semantic search, and predictive actions tailored to your role.',
      icon: Lightbulb,
      color: 'from-purple-500 to-indigo-600',
    },
    {
      title: 'Analytics & Metrics',
      description: 'Track sentiment, engagement, trends, and get actionable insights from your knowledge base.',
      icon: BarChart3,
      color: 'from-pink-500 to-rose-600',
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-center mb-6">
            <div className={`
              w-20 h-20 rounded-2xl bg-gradient-to-br ${currentStep.color}
              flex items-center justify-center
              animate-pulse-glow
            `}>
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {currentStep.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-4">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicators */}
        <div className="flex items-center justify-center gap-2 my-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`
                h-2 rounded-full transition-all-smooth
                ${index === step ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'}
              `}
            />
          ))}
        </div>

        {/* Feature Preview (only on relevant steps) */}
        {step > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-6 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-white rounded-lg shadow-sm animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="hover:scale-105 transition-transform"
          >
            Skip Tour
          </Button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="hover:scale-105 transition-transform"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="hover:scale-105 transition-transform group"
            >
              {step === steps.length - 1 ? (
                'Get Started'
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
