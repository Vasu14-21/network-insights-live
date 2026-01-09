import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const filters = [
  { filter: 'tcp', purpose: 'Show only TCP packets' },
  { filter: 'ip.addr == 192.168.1.1', purpose: 'Packets from/to specific IP' },
  { filter: 'tcp.port == 80', purpose: 'HTTP traffic (port 80)' },
  { filter: 'tcp.flags.syn == 1 && tcp.flags.ack == 0', purpose: 'SYN packets only' },
  { filter: 'icmp', purpose: 'Show ICMP/Ping packets' },
];

const FilterExamples = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="bg-secondary/50 px-6 py-4 border-b border-border">
        <h3 className="font-semibold">Wireshark Display Filters</h3>
      </div>
      <div className="divide-y divide-border">
        {filters.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-secondary/30 transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <code className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                {item.filter}
              </code>
              <p className="text-sm text-muted-foreground mt-1">{item.purpose}</p>
            </div>
            <button
              onClick={() => copyToClipboard(item.filter, idx)}
              className={cn(
                "p-2 rounded-lg transition-all",
                copiedIdx === idx 
                  ? "bg-success/20 text-success" 
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
            >
              {copiedIdx === idx ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterExamples;
