import { cn } from '@/lib/utils';

interface VoiceWaveformProps {
  isActive: boolean;
  className?: string;
  bars?: number;
}

export function VoiceWaveform({ isActive, className, bars = 5 }: VoiceWaveformProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full bg-primary-foreground transition-all duration-200",
            isActive ? "animate-waveform" : "h-2"
          )}
          style={{
            animationDelay: isActive ? `${i * 0.1}s` : '0s',
            height: isActive ? undefined : '8px',
          }}
        />
      ))}
    </div>
  );
}
