import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface TopicCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  color?: 'primary' | 'success' | 'accent';
}

const TopicCard = ({ icon: Icon, title, description, details, color = 'primary' }: TopicCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group">
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110",
        color === 'primary' && "bg-primary/20 text-primary",
        color === 'success' && "bg-success/20 text-success",
        color === 'accent' && "bg-accent/20 text-accent"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {details.map((detail, idx) => (
          <li key={idx} className="text-sm flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span className="text-muted-foreground">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicCard;
