import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomeDashboard } from '@/components/HomeDashboard';
import { ChatInterface } from '@/components/ChatInterface';
import { ScheduleView } from '@/components/ScheduleView';
import { SettingsView } from '@/components/SettingsView';
import { mockReminders, mockFamilyMembers, mockChatHistory, mockUserProfile, mockRoutines } from '@/data/mockData';
import { Reminder, ChatMessage, UserProfile } from '@/types/elderease';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const { toast } = useToast();

  const handleReminderComplete = (id: string) => {
    setReminders(prev =>
      prev.map(r =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
    
    const reminder = reminders.find(r => r.id === id);
    if (reminder && !reminder.completed) {
      toast({
        title: "Well done! 💖",
        description: `You completed: ${reminder.title}`,
      });
    }
  };

  const handleSendMessage = (content: string, isVoice: boolean) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      isVoice,
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('today')) {
      return "Today you have 5 items on your schedule: Morning medication at 8 AM ✅, Doctor's appointment at 10:30 AM, Lunch at noon, Afternoon walk at 3 PM, and Evening medication at 6 PM. Would you like me to remind you about any of these? 💖";
    }
    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return "Your next medication is your Evening Medication at 6 PM - that's your vitamins and heart medication with dinner. Your morning medication has already been completed. Great job staying on track! 💊💖";
    }
    if (lowerMessage.includes('family') || lowerMessage.includes('contact')) {
      return "Your emergency contacts are: Sarah (Daughter) - your primary contact, Michael (Son), and Emily (Granddaughter). Would you like me to call any of them for you? 👨‍👩‍👧‍👦";
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('emergency')) {
      return "I'm here to help! If you're having an emergency, please tap the red 'Send Alert to Family' button on the home screen. Your family will be notified immediately. Are you okay? 💖";
    }
    
    return "I'm here to help you, dear! You can ask me about your schedule, medications, or family contacts. Is there anything specific you'd like to know? 💖";
  };

  const handleVoiceCommand = () => {
    toast({
      title: "Voice command received 🎤",
      description: "Processing your request...",
    });
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    toast({
      title: "Settings updated 💖",
      description: "Your preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b-2 border-border px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full gradient-sky flex items-center justify-center text-2xl shadow-button">
              💖
            </div>
            <div>
              <h1 className="text-xl font-bold">ElderEase</h1>
              <p className="text-sm text-muted-foreground">Your caring companion</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <p className="text-muted-foreground">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <HomeDashboard
            reminders={reminders}
            familyMembers={mockFamilyMembers}
            userName={profile.name.split(' ')[0]}
            onReminderComplete={handleReminderComplete}
            onVoiceCommand={handleVoiceCommand}
          />
        )}
        
        {activeTab === 'chat' && (
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        )}
        
        {activeTab === 'schedule' && (
          <ScheduleView
            routines={mockRoutines}
            reminders={reminders}
          />
        )}
        
        {activeTab === 'settings' && (
          <SettingsView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <Toaster />
    </div>
  );
};

export default Index;
