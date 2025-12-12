import { ChatMessage } from '@/types/elderease';
import { cn } from '@/lib/utils';
import { Mic, User } from 'lucide-react';
import { VoiceWaveform } from './VoiceWaveform';

interface ChatBubbleProps {
  message: ChatMessage;
  isSpeaking?: boolean;
}

export function ChatBubble({ message, isSpeaking }: ChatBubbleProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
          isAssistant
            ? "bg-primary/10"
            : "bg-elder-blush"
        )}
      >
        {isAssistant ? (
          <span className="text-lg">✨</span>
        ) : (
          <User className="h-5 w-5 text-foreground/70" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isAssistant
            ? "bg-secondary rounded-tl-md"
            : "bg-primary text-primary-foreground rounded-tr-md"
        )}
      >
        {/* Voice indicator */}
        {message.isVoice && !isAssistant && (
          <div className="flex items-center gap-1.5 mb-1.5 text-primary-foreground/70">
            <Mic className="h-3 w-3" />
            <span className="text-xs">Voice</span>
          </div>
        )}

        <p className="text-base leading-relaxed">{message.content}</p>

        {/* Speaking indicator for assistant */}
        {isAssistant && isSpeaking && (
          <div className="flex items-center gap-2 mt-2 text-primary">
            <VoiceWaveform isActive={true} bars={4} className="[&>div]:bg-primary" />
            <span className="text-xs font-medium">Speaking...</span>
          </div>
        )}

        {/* Timestamp */}
        <p className={cn(
          "text-xs mt-1.5",
          isAssistant ? "text-muted-foreground" : "text-primary-foreground/60"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
