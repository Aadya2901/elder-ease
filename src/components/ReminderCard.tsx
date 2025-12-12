import { Reminder } from '@/types/elderease';
import { cn } from '@/lib/utils';
import { Check, Clock } from 'lucide-react';

interface ReminderCardProps {
  reminder: Reminder;
  isNext?: boolean;
  onComplete?: (id: string) => void;
}

export function ReminderCard({ reminder, isNext, onComplete }: ReminderCardProps) {
  const typeColors = {
    medication: 'bg-elder-lavender border-elder-lavender',
    appointment: 'bg-elder-mint border-elder-mint',
    activity: 'bg-elder-peach border-elder-peach',
    meal: 'bg-elder-sky/20 border-elder-sky',
  };

  return (
    <div
      className={cn(
        "rounded-3xl p-5 border-2 transition-all duration-200",
        typeColors[reminder.type],
        isNext && "ring-2 ring-primary ring-offset-2 shadow-card",
        reminder.completed && "opacity-60"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{reminder.icon}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-lg font-semibold text-muted-foreground">{reminder.time}</span>
            {isNext && (
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                Next
              </span>
            )}
          </div>
          
          <h3 className={cn(
            "text-xl font-bold mb-1",
            reminder.completed && "line-through"
          )}>
            {reminder.title}
          </h3>
          
          {reminder.description && (
            <p className="text-muted-foreground text-lg">{reminder.description}</p>
          )}
        </div>
        
        {onComplete && (
          <button
            onClick={() => onComplete(reminder.id)}
            className={cn(
              "h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              reminder.completed
                ? "bg-success border-success text-success-foreground"
                : "border-muted-foreground/30 hover:border-success hover:bg-success/10"
            )}
          >
            {reminder.completed && <Check className="h-6 w-6" />}
          </button>
        )}
      </div>
    </div>
  );
}
