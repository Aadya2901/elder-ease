import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DailyRoutine, Reminder } from '@/types/elderease';
import { cn } from '@/lib/utils';
import { Plus, Edit2, Trash2, Clock } from 'lucide-react';

interface ScheduleViewProps {
  routines: DailyRoutine[];
  reminders: Reminder[];
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const typeIcons: Record<string, string> = {
  medication: '💊',
  exercise: '🚶',
  meal: '🍽️',
  sleep: '😴',
  social: '👨‍👩‍👧‍👦',
  appointment: '🏥',
  activity: '⭐',
  other: '📌',
};

const typeColors: Record<string, string> = {
  medication: 'bg-elder-lavender/40',
  exercise: 'bg-elder-sage/40',
  meal: 'bg-elder-cream',
  sleep: 'bg-elder-misty',
  social: 'bg-elder-blush/40',
  appointment: 'bg-elder-sage/40',
  activity: 'bg-elder-cream',
  other: 'bg-secondary',
};

export function ScheduleView({ routines, reminders }: ScheduleViewProps) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const today = new Date();
  
  const filteredRoutines = routines.filter(routine =>
    routine.days.includes(daysOfWeek[selectedDay])
  );

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    return date;
  });

  return (
    <div className="space-y-6 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold">Schedule</h1>
          <p className="text-muted-foreground text-sm">Manage your routines</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {/* Week Calendar */}
      <div className="bg-card rounded-2xl p-3 shadow-soft border border-border/50">
        <div className="grid grid-cols-7 gap-1">
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = index === selectedDay;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={cn(
                  "flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-200",
                  isSelected && "bg-primary text-primary-foreground",
                  isToday && !isSelected && "bg-primary/10 text-primary",
                  !isSelected && !isToday && "hover:bg-secondary"
                )}
              >
                <span className="text-xs font-medium">{daysOfWeek[index]}</span>
                <span className="text-lg font-semibold mt-0.5">
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day's Routines */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {selectedDay === today.getDay() ? "Today" : daysOfWeek[selectedDay]}
        </h3>
        
        {filteredRoutines.length === 0 ? (
          <div className="text-center py-10 bg-card rounded-2xl border border-border/50">
            <p className="text-muted-foreground mb-3">No routines for this day</p>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add routine
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredRoutines
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(routine => (
                <div
                  key={routine.id}
                  className={cn(
                    "rounded-xl p-4 border border-border/50",
                    typeColors[routine.type]
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{typeIcons[routine.type]}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {routine.time.slice(0, 5)}
                        </span>
                      </div>
                      <h3 className="text-base font-medium">{routine.title}</h3>
                      {routine.notes && (
                        <p className="text-sm text-muted-foreground mt-0.5">{routine.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Add Routine Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add Routine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Title</label>
              <input
                type="text"
                placeholder="e.g., Morning Walk"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Time</label>
              <input
                type="time"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Days</label>
              <div className="flex gap-1.5 flex-wrap">
                {daysOfWeek.map(day => (
                  <button
                    key={day}
                    className="px-3 py-1.5 rounded-lg border border-border text-sm hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Notes</label>
              <textarea
                placeholder="Optional notes..."
                className="w-full h-20 px-3 py-2 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
