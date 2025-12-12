import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
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
    default: 'h-20 w-20',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  }[size];

  return (
    <div className={cn("relative", className)}>
      {/* Pulse ring animation when listening */}
      {isListening && (
        <>
          <div className="absolute inset-0 rounded-full gradient-sky animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full gradient-sky animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
        </>
      )}
      
      <Button
        variant="voice"
        className={cn(
          sizeClass,
          "relative z-10 flex flex-col items-center justify-center p-0",
          isListening && "ring-4 ring-primary/30"
        )}
        onClick={onClick}
      >
        {isSpeaking ? (
          <VoiceWaveform isActive={true} bars={5} />
        ) : isListening ? (
          <Mic className="h-10 w-10 animate-pulse" />
        ) : (
          <Mic className="h-10 w-10" />
        )}
      </Button>
      
      <p className="text-center mt-3 text-lg font-medium text-muted-foreground">
        {isSpeaking ? 'Listening...' : isListening ? 'Speak now' : 'Tap to speak'}
      </p>
    </div>
  );
}
