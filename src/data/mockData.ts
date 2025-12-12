import { Reminder, FamilyMember, ChatMessage, UserProfile, DailyRoutine } from '@/types/elderease';

export const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Morning Medication',
    time: '8:00 AM',
    type: 'medication',
    description: 'Take blood pressure pill with water',
    completed: true,
    icon: '💊',
  },
  {
    id: '2',
    title: 'Doctor Appointment',
    time: '10:30 AM',
    type: 'appointment',
    description: 'Dr. Smith - Annual checkup',
    completed: false,
    icon: '🏥',
  },
  {
    id: '3',
    title: 'Lunch Time',
    time: '12:00 PM',
    type: 'meal',
    description: 'Remember to eat a healthy lunch',
    completed: false,
    icon: '🍽️',
  },
  {
    id: '4',
    title: 'Afternoon Walk',
    time: '3:00 PM',
    type: 'activity',
    description: '15 minute walk in the garden',
    completed: false,
    icon: '🚶',
  },
  {
    id: '5',
    title: 'Evening Medication',
    time: '6:00 PM',
    type: 'medication',
    description: 'Take vitamins and heart medication',
    completed: false,
    icon: '💊',
  },
];

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    relationship: 'Daughter',
    phone: '+1 (555) 123-4567',
    email: 'sarah@email.com',
    avatar: '👩',
    isPrimary: true,
  },
  {
    id: '2',
    name: 'Michael Johnson',
    relationship: 'Son',
    phone: '+1 (555) 987-6543',
    email: 'michael@email.com',
    avatar: '👨',
    isPrimary: false,
  },
  {
    id: '3',
    name: 'Emily Davis',
    relationship: 'Granddaughter',
    phone: '+1 (555) 456-7890',
    email: 'emily@email.com',
    avatar: '👧',
    isPrimary: false,
  },
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Good morning, dear! 💖 I hope you slept well. Your first medication reminder is at 8 AM. Is there anything I can help you with today?",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    role: 'user',
    content: "What's on my schedule today?",
    timestamp: new Date(Date.now() - 3500000),
    isVoice: true,
  },
  {
    id: '3',
    role: 'assistant',
    content: "Today you have: 💊 Morning medication at 8 AM (completed!), 🏥 Doctor's appointment at 10:30 AM, 🍽️ Lunch at noon, 🚶 Afternoon walk at 3 PM, and 💊 Evening medication at 6 PM. Would you like me to remind you about anything specific?",
    timestamp: new Date(Date.now() - 3400000),
  },
];

export const mockUserProfile: UserProfile = {
  name: 'Margaret Wilson',
  age: 78,
  avatar: '👵',
  emergencyContacts: mockFamilyMembers,
  preferences: {
    voiceEnabled: true,
    largeText: true,
    highContrast: false,
    reminderSound: true,
  },
};

export const mockRoutines: DailyRoutine[] = [
  {
    id: '1',
    title: 'Morning Medication',
    time: '08:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'medication',
    notes: 'Blood pressure medication with breakfast',
  },
  {
    id: '2',
    title: 'Morning Exercise',
    time: '09:00',
    days: ['Mon', 'Wed', 'Fri'],
    type: 'exercise',
    notes: 'Light stretching and walking',
  },
  {
    id: '3',
    title: 'Lunch',
    time: '12:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'meal',
  },
  {
    id: '4',
    title: 'Afternoon Walk',
    time: '15:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'exercise',
    notes: '15-20 minute walk',
  },
  {
    id: '5',
    title: 'Video Call with Family',
    time: '17:00',
    days: ['Sat', 'Sun'],
    type: 'social',
    notes: 'Weekly family catch-up',
  },
  {
    id: '6',
    title: 'Evening Medication',
    time: '18:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'medication',
    notes: 'Vitamins and heart medication with dinner',
  },
  {
    id: '7',
    title: 'Bedtime',
    time: '21:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    type: 'sleep',
  },
];
