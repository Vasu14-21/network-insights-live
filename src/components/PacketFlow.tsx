import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Packet {
  id: number;
  type: 'syn' | 'ack' | 'data' | 'icmp';
  position: number;
  direction: 'left' | 'right';
}

const PacketFlow = () => {
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    const types: Packet['type'][] = ['syn', 'ack', 'data', 'icmp'];
    let packetId = 0;

    const createPacket = () => {
      const type = types[Math.floor(Math.random() * types.length)];
      const direction: 'left' | 'right' = Math.random() > 0.5 ? 'left' : 'right';
      
      const newPacket: Packet = {
        id: packetId++,
        type,
        position: direction === 'left' ? 0 : 100,
        direction
      };

      setPackets(prev => [...prev, newPacket]);

      // Remove packet after animation
      setTimeout(() => {
        setPackets(prev => prev.filter(p => p.id !== newPacket.id));
      }, 3000);
    };

    const interval = setInterval(createPacket, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const movePackets = setInterval(() => {
      setPackets(prev =>
        prev.map(packet => ({
          ...packet,
          position: packet.direction === 'left' 
            ? Math.min(packet.position + 2, 100) 
            : Math.max(packet.position - 2, 0)
        }))
      );
    }, 50);

    return () => clearInterval(movePackets);
  }, []);

  const getPacketColor = (type: Packet['type']) => {
    switch (type) {
      case 'syn': return 'bg-primary shadow-primary/50';
      case 'ack': return 'bg-success shadow-success/50';
      case 'data': return 'bg-purple-500 shadow-purple-500/50';
      case 'icmp': return 'bg-amber-500 shadow-amber-500/50';
    }
  };

  const getPacketLabel = (type: Packet['type']) => {
    switch (type) {
      case 'syn': return 'SYN';
      case 'ack': return 'ACK';
      case 'data': return 'DATA';
      case 'icmp': return 'ICMP';
    }
  };

  return (
    <div className="relative h-32 terminal-border overflow-hidden">
      {/* Flow lines */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4 px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Packets */}
      {packets.map(packet => (
        <div
          key={packet.id}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 px-2 py-1 rounded text-[10px] font-mono font-bold shadow-lg transition-opacity",
            getPacketColor(packet.type),
            "text-white"
          )}
          style={{
            left: `${packet.position}%`,
            opacity: packet.position > 10 && packet.position < 90 ? 1 : 0
          }}
        >
          {getPacketLabel(packet.type)}
        </div>
      ))}

      {/* Endpoints */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-xs">
        💻
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-xs">
        🖥️
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
        {['syn', 'ack', 'data', 'icmp'].map(type => (
          <div key={type} className="flex items-center gap-1">
            <div className={cn(
              "w-2 h-2 rounded-full",
              type === 'syn' && "bg-primary",
              type === 'ack' && "bg-success",
              type === 'data' && "bg-purple-500",
              type === 'icmp' && "bg-amber-500"
            )} />
            <span className="text-[10px] font-mono text-muted-foreground uppercase">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PacketFlow;
