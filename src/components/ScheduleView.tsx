import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DailyRoutine, Reminder } from '@/types/elderease';
import { cn } from '@/lib/utils';
import { Plus, Edit2, Trash2, Clock, Calendar as CalendarIcon } from 'lucide-react';

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
  medication: 'bg-elder-lavender',
  exercise: 'bg-elder-mint',
  meal: 'bg-elder-peach',
  sleep: 'bg-elder-sky/20',
  social: 'bg-elder-coral/20',
  appointment: 'bg-elder-mint',
  activity: 'bg-elder-peach',
  other: 'bg-secondary',
};

export function ScheduleView({ routines, reminders }: ScheduleViewProps) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const today = new Date();
  const currentDayName = daysOfWeek[today.getDay()];
  
  const filteredRoutines = routines.filter(routine =>
    routine.days.includes(daysOfWeek[selectedDay])
  );

  // Generate calendar dates for current week
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
          <h1 className="text-2xl font-bold">📅 My Schedule</h1>
          <p className="text-muted-foreground text-lg">Manage your daily routines</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-5 w-5" />
          Add New
        </Button>
      </div>

      {/* Week Calendar */}
      <div className="bg-card rounded-3xl p-4 shadow-soft">
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = index === selectedDay;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-2xl transition-all duration-200",
                  isSelected && "gradient-sky text-primary-foreground shadow-button",
                  isToday && !isSelected && "bg-primary/10 text-primary",
                  !isSelected && !isToday && "hover:bg-secondary"
                )}
              >
                <span className="text-sm font-medium">{daysOfWeek[index]}</span>
                <span className={cn(
                  "text-2xl font-bold mt-1",
                  isSelected ? "text-primary-foreground" : ""
                )}>
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day's Routines */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          {selectedDay === today.getDay() ? "Today's Routines" : `${daysOfWeek[selectedDay]}'s Routines`}
        </h2>
        
        {filteredRoutines.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-3xl">
            <p className="text-muted-foreground text-xl mb-4">No routines for this day</p>
            <Button variant="outline" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-5 w-5" />
              Add a routine
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRoutines
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(routine => (
                <div
                  key={routine.id}
                  className={cn(
                    "rounded-3xl p-5 border-2 border-transparent",
                    typeColors[routine.type]
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{typeIcons[routine.type]}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span className="text-lg font-semibold text-muted-foreground">
                          {routine.time.slice(0, 5)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{routine.title}</h3>
                      {routine.notes && (
                        <p className="text-muted-foreground mt-1">{routine.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-12 w-12">
                        <Edit2 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-12 w-12 text-destructive">
                        <Trash2 className="h-5 w-5" />
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
        <DialogContent className="sm:max-w-lg rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add New Routine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-lg font-medium block mb-2">Title</label>
              <input
                type="text"
                placeholder="e.g., Morning Walk"
                className="w-full min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-lg font-medium block mb-2">Time</label>
              <input
                type="time"
                className="w-full min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-lg font-medium block mb-2">Days</label>
              <div className="flex gap-2 flex-wrap">
                {daysOfWeek.map(day => (
                  <button
                    key={day}
                    className="px-4 py-2 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/10 transition-all"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-lg font-medium block mb-2">Notes (optional)</label>
              <textarea
                placeholder="Add any additional notes..."
                className="w-full min-h-[100px] px-6 py-4 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button size="lg" className="flex-1">
                Save Routine
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
