import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { VoiceWaveform } from './VoiceWaveform';
import { cn } from '@/lib/utils';

interface VoiceButtonProps {
  isListening: boolean;
  isSpeaking: boolean;
  onClick: () => void;
  size?: 'default' | 'lg' | 'xl';
  className?: string;
}

export function VoiceButton({ isListening, isSpeaking, onClick, size = 'lg', className }: VoiceButtonProps) {
  const sizeClass = {
    default: 'h-16 w-16',
    lg: 'h-20 w-20',
    xl: 'h-24 w-24',
  }[size];

  const iconSize = {
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  }[size];

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Pulse ring animation when listening */}
      {isListening && (
        <>
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full bg-primary/15 animate-pulse-ring" style={{ animationDelay: '0.4s' }} />
        </>
      )}
      
      <Button
        className={cn(
          sizeClass,
          "rounded-full relative z-10 shadow-button",
          isListening && "ring-4 ring-primary/20"
        )}
        onClick={onClick}
      >
        {isSpeaking ? (
          <VoiceWaveform isActive={true} bars={4} />
        ) : (
          <Mic className={cn(iconSize, isListening && "animate-pulse")} />
        )}
      </Button>
      
      <p className="text-center mt-4 text-sm font-medium text-muted-foreground">
        {isSpeaking ? 'Listening...' : isListening ? 'Speak now' : 'Tap to speak'}
      </p>
    </div>
  );
}
