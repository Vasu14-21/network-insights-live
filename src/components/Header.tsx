import { Activity } from 'lucide-react';
import PacketFlow from './PacketFlow';

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      
      <div className="relative container py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <span className="font-mono text-sm text-primary">NETWORK ANALYSIS</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="neon-text">TCP/IP & Wireshark</span>
          <br />
          <span className="text-muted-foreground">Learning Lab</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Master network protocols through interactive visualizations. 
          Learn TCP handshakes, packet analysis, and Wireshark filters with real-time animations.
        </p>

        {/* Live packet flow visualization */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-muted-foreground mb-2">LIVE PACKET FLOW</div>
          <PacketFlow />
        </div>
      </div>
    </header>
  );
};

export default Header;
