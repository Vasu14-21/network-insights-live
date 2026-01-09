import { cn } from '@/lib/utils';

const flags = [
  { flag: 'SYN', meaning: 'Synchronize - Start connection', color: 'primary' },
  { flag: 'ACK', meaning: 'Acknowledge received data', color: 'success' },
  { flag: 'FIN', meaning: 'Finish - Close connection', color: 'accent' },
  { flag: 'RST', meaning: 'Reset connection immediately', color: 'destructive' },
  { flag: 'PSH', meaning: 'Push data immediately', color: 'primary' },
  { flag: 'URG', meaning: 'Urgent data present', color: 'destructive' },
];

const TCPFlagsTable = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="bg-secondary/50 px-6 py-4 border-b border-border">
        <h3 className="font-semibold font-mono">TCP Flags Reference</h3>
      </div>
      <div className="divide-y divide-border">
        {flags.map((item, idx) => (
          <div
            key={item.flag}
            className="flex items-center gap-4 px-6 py-3 hover:bg-secondary/30 transition-colors"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <span className={cn(
              "px-3 py-1 rounded-md font-mono text-sm font-bold min-w-[60px] text-center",
              item.color === 'primary' && "bg-primary/20 text-primary",
              item.color === 'success' && "bg-success/20 text-success",
              item.color === 'accent' && "bg-accent/20 text-accent",
              item.color === 'destructive' && "bg-destructive/20 text-destructive"
            )}>
              {item.flag}
            </span>
            <span className="text-sm text-muted-foreground">{item.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TCPFlagsTable;
