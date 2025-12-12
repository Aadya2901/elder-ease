export interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment' | 'activity' | 'meal';
  description?: string;
  completed: boolean;
  icon?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  avatar?: string;
  isPrimary: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  avatar?: string;
  emergencyContacts: FamilyMember[];
  preferences: {
    voiceEnabled: boolean;
    largeText: boolean;
    highContrast: boolean;
    reminderSound: boolean;
  };
}

export interface DailyRoutine {
  id: string;
  title: string;
  time: string;
  days: string[];
  type: 'medication' | 'exercise' | 'meal' | 'sleep' | 'social' | 'other';
  notes?: string;
}
