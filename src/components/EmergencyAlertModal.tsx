import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FamilyMember } from '@/types/elderease';
import { cn } from '@/lib/utils';
import { Check, Phone, AlertTriangle, Heart } from 'lucide-react';

interface EmergencyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
}

export function EmergencyAlertModal({ isOpen, onClose, familyMembers }: EmergencyAlertModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const toggleMember = (id: string) => {
    setSelectedMembers(prev =>
      prev.includes(id)
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  const handleSendAlert = async () => {
    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    setIsSent(true);
  };

  const handleClose = () => {
    setSelectedMembers([]);
    setIsSending(false);
    setIsSent(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg rounded-3xl p-8">
        {!isSent ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <DialogTitle className="text-2xl font-bold">Send Emergency Alert</DialogTitle>
              <DialogDescription className="text-lg mt-2">
                Select family members to notify. They will receive a call and message immediately.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-6">
              {familyMembers.map(member => (
                <button
                  key={member.id}
                  onClick={() => toggleMember(member.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200",
                    selectedMembers.includes(member.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="h-14 w-14 rounded-full bg-elder-peach flex items-center justify-center text-2xl">
                    {member.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xl font-semibold">{member.name}</p>
                    <p className="text-muted-foreground">{member.relationship}</p>
                  </div>
                  <div className={cn(
                    "h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedMembers.includes(member.id)
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30"
                  )}>
                    {selectedMembers.includes(member.id) && (
                      <Check className="h-5 w-5 text-primary-foreground" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <Button variant="secondary" size="lg" className="flex-1" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="emergency"
                size="lg"
                className="flex-1"
                disabled={selectedMembers.length === 0 || isSending}
                onClick={handleSendAlert}
              >
                {isSending ? (
                  'Sending...'
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    Send Alert
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
              <Heart className="h-10 w-10 text-success animate-heartbeat" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Alert Sent! 💖</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Your family has been notified and will be with you soon.
            </p>
            <p className="text-xl mb-8">
              {selectedMembers.length} family member{selectedMembers.length > 1 ? 's' : ''} notified
            </p>
            <Button size="lg" onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
