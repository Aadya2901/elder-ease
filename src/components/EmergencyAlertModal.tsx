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
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        {!isSent ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <DialogTitle className="text-xl font-semibold">Send Emergency Alert</DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Select family members to notify immediately.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 mt-4">
              {familyMembers.map(member => (
                <button
                  key={member.id}
                  onClick={() => toggleMember(member.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200",
                    selectedMembers.includes(member.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="h-10 w-10 rounded-full bg-elder-blush flex items-center justify-center text-lg">
                    {member.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-base font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.relationship}</p>
                  </div>
                  <div className={cn(
                    "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedMembers.includes(member.id)
                      ? "bg-primary border-primary"
                      : "border-border"
                  )}>
                    {selectedMembers.includes(member.id) && (
                      <Check className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="secondary" className="flex-1" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                disabled={selectedMembers.length === 0 || isSending}
                onClick={handleSendAlert}
              >
                {isSending ? (
                  'Sending...'
                ) : (
                  <>
                    <Phone className="h-4 w-4 mr-1" />
                    Send Alert
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
              <Heart className="h-7 w-7 text-success" />
            </div>
            <h2 className="text-xl font-semibold mb-1">Alert Sent</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Your family has been notified.
            </p>
            <p className="text-base mb-6">
              {selectedMembers.length} family member{selectedMembers.length > 1 ? 's' : ''} notified
            </p>
            <Button onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
