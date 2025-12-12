import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { UserProfile, FamilyMember } from '@/types/elderease';
import { cn } from '@/lib/utils';
import { User, Phone, Mail, Plus, Edit2, Trash2, Volume2, Type, Eye, Bell, Heart, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SettingsViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
}

export function SettingsView({ profile, onUpdateProfile }: SettingsViewProps) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  const togglePreference = (key: keyof UserProfile['preferences']) => {
    onUpdateProfile({
      preferences: {
        ...profile.preferences,
        [key]: !profile.preferences[key],
      },
    });
  };

  return (
    <div className="space-y-6 pb-32">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">⚙️ Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your profile and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-3xl p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full gradient-sky flex items-center justify-center text-4xl">
            {profile.avatar || '👵'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground text-lg">{profile.age} years old</p>
          </div>
          <Button variant="outline" onClick={() => setIsEditProfileOpen(true)}>
            <Edit2 className="h-5 w-5" />
            Edit
          </Button>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-card rounded-3xl p-6 shadow-soft">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Eye className="h-6 w-6" />
          Accessibility
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50">
            <div className="flex items-center gap-3">
              <Volume2 className="h-6 w-6 text-primary" />
              <div>
                <p className="text-lg font-semibold">Voice Feedback</p>
                <p className="text-muted-foreground">AI speaks responses aloud</p>
              </div>
            </div>
            <Switch
              checked={profile.preferences.voiceEnabled}
              onCheckedChange={() => togglePreference('voiceEnabled')}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50">
            <div className="flex items-center gap-3">
              <Type className="h-6 w-6 text-primary" />
              <div>
                <p className="text-lg font-semibold">Large Text</p>
                <p className="text-muted-foreground">Increase text size</p>
              </div>
            </div>
            <Switch
              checked={profile.preferences.largeText}
              onCheckedChange={() => togglePreference('largeText')}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-primary" />
              <div>
                <p className="text-lg font-semibold">High Contrast</p>
                <p className="text-muted-foreground">Improve visibility</p>
              </div>
            </div>
            <Switch
              checked={profile.preferences.highContrast}
              onCheckedChange={() => togglePreference('highContrast')}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-primary" />
              <div>
                <p className="text-lg font-semibold">Reminder Sounds</p>
                <p className="text-muted-foreground">Play sound for reminders</p>
              </div>
            </div>
            <Switch
              checked={profile.preferences.reminderSound}
              onCheckedChange={() => togglePreference('reminderSound')}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-card rounded-3xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-destructive" />
            Emergency Contacts
          </h3>
          <Button variant="outline" size="sm" onClick={() => setIsAddContactOpen(true)}>
            <Plus className="h-5 w-5" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {profile.emergencyContacts.map(contact => (
            <div
              key={contact.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border-2",
                contact.isPrimary ? "border-primary bg-primary/5" : "border-border"
              )}
            >
              <div className="h-14 w-14 rounded-full bg-elder-peach flex items-center justify-center text-2xl">
                {contact.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">{contact.name}</p>
                  {contact.isPrimary && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-sm">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{contact.relationship}</p>
                <div className="flex items-center gap-4 mt-1 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {contact.phone}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-card rounded-3xl p-6 shadow-soft">
        <h3 className="text-xl font-bold mb-4">About ElderEase</h3>
        <p className="text-muted-foreground text-lg mb-4">
          Your caring AI companion, designed with love to help you stay healthy, connected, and safe. 💖
        </p>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50">
          <span className="text-lg">Version</span>
          <span className="text-muted-foreground">1.0.0</span>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-lg font-medium block mb-2">Name</label>
              <input
                type="text"
                defaultValue={profile.name}
                className="w-full min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-lg font-medium block mb-2">Age</label>
              <input
                type="number"
                defaultValue={profile.age}
                className="w-full min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => setIsEditProfileOpen(false)}>
                Cancel
              </Button>
              <Button size="lg" className="flex-1">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Contact Modal */}
      <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add Emergency Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-lg font-medium block mb-2">Name</label>
              <input
                type="text"
                placeholder="e.g., John Smith"
                className="w-full min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-lg font-medium block mb-2">Relationship</label>
              <input
                type="text"
                placeholder="e.g., Son, Daughter, Neighbor"
                className="w-full min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-lg font-medium block mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-lg font-medium block mb-2">Email (optional)</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => setIsAddContactOpen(false)}>
                Cancel
              </Button>
              <Button size="lg" className="flex-1">
                Add Contact
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
