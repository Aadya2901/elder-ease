import { Reminder } from '@/types/elderease';
import { cn } from '@/lib/utils';
import { Check, Clock } from 'lucide-react';

interface ReminderCardProps {
  reminder: Reminder;
  isNext?: boolean;
  onComplete?: (id: string) => void;
}

export function ReminderCard({ reminder, isNext, onComplete }: ReminderCardProps) {
  const typeStyles = {
    medication: 'bg-elder-lavender/50',
    appointment: 'bg-elder-sage/50',
    activity: 'bg-elder-cream',
    meal: 'bg-elder-blush/50',
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-4 transition-all duration-200 border border-border/50",
        typeStyles[reminder.type],
        isNext && "ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
        reminder.completed && "opacity-50"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="text-2xl flex-shrink-0">{reminder.icon}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">{reminder.time}</span>
            {isNext && (
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                Next
              </span>
            )}
          </div>
          
          <h3 className={cn(
            "text-base font-semibold text-foreground",
            reminder.completed && "line-through"
          )}>
            {reminder.title}
          </h3>
          
          {reminder.description && (
            <p className="text-sm text-muted-foreground mt-0.5">{reminder.description}</p>
          )}
        </div>
        
        {onComplete && (
          <button
            onClick={() => onComplete(reminder.id)}
            className={cn(
              "h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0",
              reminder.completed
                ? "bg-success border-success text-success-foreground"
                : "border-border hover:border-primary hover:bg-primary/5"
            )}
          >
            {reminder.completed && <Check className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
}
