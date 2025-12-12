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
        "flex gap-4 animate-fade-in",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 text-2xl",
          isAssistant
            ? "gradient-sky text-primary-foreground"
            : "bg-elder-peach"
        )}
      >
        {isAssistant ? '💖' : <User className="h-7 w-7 text-foreground" />}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-3xl p-5 shadow-soft",
          isAssistant
            ? "bg-card rounded-tl-lg"
            : "bg-primary text-primary-foreground rounded-tr-lg"
        )}
      >
        {/* Voice indicator */}
        {message.isVoice && !isAssistant && (
          <div className="flex items-center gap-2 mb-2 text-primary-foreground/80">
            <Mic className="h-4 w-4" />
            <span className="text-sm">Voice message</span>
          </div>
        )}

        <p className="text-xl leading-relaxed">{message.content}</p>

        {/* Speaking indicator for assistant */}
        {isAssistant && isSpeaking && (
          <div className="flex items-center gap-2 mt-3 text-primary">
            <VoiceWaveform isActive={true} bars={4} className="[&>div]:bg-primary" />
            <span className="text-sm font-medium">Speaking...</span>
          </div>
        )}

        {/* Timestamp */}
        <p className={cn(
          "text-sm mt-2",
          isAssistant ? "text-muted-foreground" : "text-primary-foreground/70"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
