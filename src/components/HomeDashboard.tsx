import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReminderCard } from '@/components/ReminderCard';
import { VoiceButton } from '@/components/VoiceButton';
import { EmergencyAlertModal } from '@/components/EmergencyAlertModal';
import { Reminder, FamilyMember } from '@/types/elderease';
import { AlertTriangle, Sun, Heart } from 'lucide-react';

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
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        setIsListening(false);
        onVoiceCommand();
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 pb-32">
      {/* Header */}
      <div className="gradient-sky rounded-3xl p-6 text-primary-foreground shadow-card">
        <div className="flex items-center gap-3 mb-2">
          <Sun className="h-8 w-8" />
          <span className="text-xl">{greeting},</span>
        </div>
        <h1 className="text-3xl font-bold">{userName} 💖</h1>
        <p className="text-lg mt-2 text-primary-foreground/90">
          You have {reminders.length - completedCount} tasks remaining today
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
        <p className="text-muted-foreground text-center mt-4 text-lg">
          Ask me about your schedule, medications, or anything else!
        </p>
      </div>

      {/* Next Reminder Card */}
      {nextReminder && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>⏰</span> Next Reminder
          </h2>
          <ReminderCard
            reminder={nextReminder}
            isNext={true}
            onComplete={onReminderComplete}
          />
        </div>
      )}

      {/* Today's Schedule Preview */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>📅</span> Today's Schedule
        </h2>
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
          variant="emergency"
          size="xl"
          className="w-full"
          onClick={() => setIsEmergencyModalOpen(true)}
        >
          <AlertTriangle className="h-6 w-6" />
          Send Alert to Family
        </Button>
        <p className="text-center text-muted-foreground mt-2">
          Tap if you need help - your family will be notified immediately
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
