import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HandshakeStep {
  id: number;
  from: 'client' | 'server';
  label: string;
  flag: string;
  description: string;
  seqNum: string;
}

const steps: HandshakeStep[] = [
  {
    id: 1,
    from: 'client',
    label: 'SYN',
    flag: 'SYN',
    description: 'Client initiates connection',
    seqNum: 'Seq=1000'
  },
  {
    id: 2,
    from: 'server',
    label: 'SYN-ACK',
    flag: 'SYN+ACK',
    description: 'Server acknowledges and synchronizes',
    seqNum: 'Seq=5000, Ack=1001'
  },
  {
    id: 3,
    from: 'client',
    label: 'ACK',
    flag: 'ACK',
    description: 'Client confirms connection',
    seqNum: 'Ack=5001'
  }
];

const ThreeWayHandshake = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [packetPosition, setPacketPosition] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(stepInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (currentStep < 0) {
      setPacketPosition(0);
      return;
    }

    const animate = () => {
      let start: number;
      const duration = 800;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setPacketPosition(progress * 100);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    setPacketPosition(0);
    animate();
  }, [currentStep]);

  const reset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setPacketPosition(0);
  };

  const start = () => {
    if (currentStep >= steps.length - 1) {
      reset();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(true);
    }
  };

  const activeStep = currentStep >= 0 ? steps[currentStep] : null;

  return (
    <div className="glass-card rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-center neon-text">TCP Three-Way Handshake</h3>
      
      {/* Animation Container */}
      <div className="relative h-80 mb-8 terminal-border p-6 overflow-hidden grid-pattern">
        {/* Client */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-center">
          <div className={cn(
            "w-24 h-24 rounded-2xl border-2 flex items-center justify-center mb-2 transition-all duration-300",
            (activeStep?.from === 'client' || !activeStep) ? "border-primary bg-primary/20 neon-glow" : "border-border bg-card"
          )}>
            <div className="text-center">
              <div className="text-2xl mb-1">💻</div>
              <span className="text-xs font-mono">Client</span>
            </div>
          </div>
        </div>

        {/* Server */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-center">
          <div className={cn(
            "w-24 h-24 rounded-2xl border-2 flex items-center justify-center mb-2 transition-all duration-300",
            activeStep?.from === 'server' ? "border-primary bg-primary/20 neon-glow" : "border-border bg-card"
          )}>
            <div className="text-center">
              <div className="text-2xl mb-1">🖥️</div>
              <span className="text-xs font-mono">Server</span>
            </div>
          </div>
        </div>

        {/* Connection Line */}
        <div className="absolute left-32 right-32 top-1/2 h-0.5 bg-border -translate-y-1/2" />

        {/* Packet Animation */}
        {activeStep && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 transition-all duration-75",
              activeStep.from === 'client' ? "left-32" : "right-32"
            )}
            style={{
              transform: `translateY(-50%) translateX(${activeStep.from === 'client' ? packetPosition : -packetPosition}%)`,
              left: activeStep.from === 'client' ? '8rem' : 'auto',
              right: activeStep.from === 'server' ? '8rem' : 'auto',
            }}
          >
            <div className="relative">
              <div className={cn(
                "px-4 py-2 rounded-lg font-mono text-sm font-bold whitespace-nowrap animate-pulse-glow",
                activeStep.label === 'SYN' && "bg-primary text-primary-foreground",
                activeStep.label === 'SYN-ACK' && "bg-accent text-accent-foreground",
                activeStep.label === 'ACK' && "bg-success text-success-foreground"
              )}>
                {activeStep.label}
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap">
                {activeStep.seqNum}
              </div>
            </div>
          </div>
        )}

        {/* Step Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all",
                idx <= currentStep 
                  ? "bg-primary/20 text-primary border border-primary/50" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              <span className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                idx <= currentStep ? "bg-primary text-primary-foreground" : "bg-border"
              )}>
                {idx + 1}
              </span>
              {step.flag}
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="text-center mb-6 h-16">
        {activeStep ? (
          <div className="animate-slide-in">
            <p className="text-lg font-medium mb-1">{activeStep.description}</p>
            <p className="text-sm text-muted-foreground font-mono">{activeStep.seqNum}</p>
          </div>
        ) : currentStep >= steps.length - 1 ? (
          <div className="animate-slide-in">
            <p className="text-lg font-medium text-success">Connection Established! ✓</p>
            <p className="text-sm text-muted-foreground">Both sides are now synchronized</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Click play to see the handshake in action</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant="neon"
          size="lg"
          onClick={isPlaying ? () => setIsPlaying(false) : start}
          className="gap-2"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button variant="outline" size="lg" onClick={reset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ThreeWayHandshake;
