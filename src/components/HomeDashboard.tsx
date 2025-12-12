import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReminderCard } from '@/components/ReminderCard';
import { VoiceButton } from '@/components/VoiceButton';
import { EmergencyAlertModal } from '@/components/EmergencyAlertModal';
import { Reminder, FamilyMember } from '@/types/elderease';
import { AlertTriangle } from 'lucide-react';

interface HomeDashboardProps {
  reminders: Reminder[];
  familyMembers: FamilyMember[];
  userName: string;
  onReminderComplete: (id: string) => void;
  onVoiceCommand: () => void;
}

export function HomeDashboard({
  reminders,
  familyMembers,
  userName,
  onReminderComplete,
  onVoiceCommand,
}: HomeDashboardProps) {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const nextReminder = reminders.find(r => !r.completed);
  const completedCount = reminders.filter(r => r.completed).length;
  const currentHour = new Date().getHours();
  
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        onVoiceCommand();
      }, 3000);
    }
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Greeting */}
      <div className="text-center py-6">
        <p className="text-muted-foreground text-lg">{greeting},</p>
        <h2 className="text-3xl font-display font-semibold text-foreground mt-1">{userName}</h2>
        <p className="text-muted-foreground mt-2">
          {reminders.length - completedCount} tasks remaining today
        </p>
      </div>

      {/* Voice Command Button */}
      <div className="flex flex-col items-center py-4">
        <VoiceButton
          isListening={isListening}
          isSpeaking={false}
          onClick={handleVoiceClick}
          size="xl"
        />
      </div>

      {/* Next Reminder Card */}
      {nextReminder && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Next up
          </h3>
          <ReminderCard
            reminder={nextReminder}
            isNext={true}
            onComplete={onReminderComplete}
          />
        </div>
      )}

      {/* Today's Schedule Preview */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Today's Schedule
        </h3>
        <div className="space-y-3">
          {reminders.slice(0, 4).map(reminder => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onComplete={onReminderComplete}
            />
          ))}
        </div>
      </div>

      {/* Emergency Alert Button */}
      <div className="pt-4">
        <Button
          variant="destructive"
          size="lg"
          className="w-full h-14 text-lg font-medium"
          onClick={() => setIsEmergencyModalOpen(true)}
        >
          <AlertTriangle className="h-5 w-5 mr-2" />
          Send Alert to Family
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-3">
          Tap if you need help — your family will be notified
        </p>
      </div>

      <EmergencyAlertModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        familyMembers={familyMembers}
      />
    </div>
  );
}
