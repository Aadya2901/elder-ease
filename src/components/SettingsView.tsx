import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { UserProfile } from '@/types/elderease';
import { cn } from '@/lib/utils';
import { Phone, Plus, Edit2, Trash2, Volume2, Type, Eye, Bell, Heart } from 'lucide-react';
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
        <h1 className="text-2xl font-display font-semibold">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
            {profile.avatar || '👵'}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.age} years old</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsEditProfileOpen(true)}>
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Accessibility
        </h3>
        <div className="space-y-3">
          {[
            { key: 'voiceEnabled', icon: Volume2, title: 'Voice Feedback', desc: 'AI speaks responses' },
            { key: 'largeText', icon: Type, title: 'Large Text', desc: 'Increase text size' },
            { key: 'highContrast', icon: Eye, title: 'High Contrast', desc: 'Improve visibility' },
            { key: 'reminderSound', icon: Bell, title: 'Reminder Sounds', desc: 'Play notification sounds' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-base font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Switch
                checked={profile.preferences[item.key as keyof UserProfile['preferences']]}
                onCheckedChange={() => togglePreference(item.key as keyof UserProfile['preferences'])}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Heart className="h-4 w-4 text-destructive" />
            Emergency Contacts
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setIsAddContactOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {profile.emergencyContacts.map(contact => (
            <div
              key={contact.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border",
                contact.isPrimary ? "border-primary/30 bg-primary/5" : "border-border/50"
              )}
            >
              <div className="h-10 w-10 rounded-full bg-elder-blush flex items-center justify-center text-lg">
                {contact.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium">{contact.name}</p>
                  {contact.isPrimary && (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-primary/10 text-primary font-medium">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {contact.phone}
                </p>
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
          ))}
        </div>
      </div>

      {/* About */}
      <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">About</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Your caring AI companion, designed to help you stay healthy and connected.
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Version</span>
          <span>1.0.0</span>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Name</label>
              <input
                type="text"
                defaultValue={profile.name}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Age</label>
              <input
                type="number"
                defaultValue={profile.age}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setIsEditProfileOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Contact Modal */}
      <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Name</label>
              <input
                type="text"
                placeholder="John Smith"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Relationship</label>
              <input
                type="text"
                placeholder="Son, Daughter, etc."
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setIsAddContactOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1">
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
