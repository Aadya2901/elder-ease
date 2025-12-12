import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChatBubble } from '@/components/ChatBubble';
import { VoiceButton } from '@/components/VoiceButton';
import { ChatMessage } from '@/types/elderease';
import { Send, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (content: string, isVoice: boolean) => void;
}

export function ChatInterface({ messages, onSendMessage }: ChatInterfaceProps) {
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [textInput, setTextInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleVoiceClick = () => {
    if (isListening) {
      setIsListening(false);
      // Simulate sending a voice message
      onSendMessage("What's on my schedule today?", true);
      
      // Simulate AI speaking response
      setTimeout(() => {
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
      }, 1000);
    } else {
      setIsListening(true);
      // Auto-stop after 5 seconds
      setTimeout(() => setIsListening(false), 5000);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onSendMessage(textInput, false);
      setTextInput('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-1 py-4 space-y-6">
        {messages.map((message, index) => (
          <ChatBubble
            key={message.id}
            message={message}
            isSpeaking={isSpeaking && message.role === 'assistant' && index === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t-2 border-border bg-background pt-4 pb-24">
        {inputMode === 'voice' ? (
          <div className="flex flex-col items-center">
            <VoiceButton
              isListening={isListening}
              isSpeaking={isSpeaking}
              onClick={handleVoiceClick}
              size="lg"
            />
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => setInputMode('text')}
            >
              <Keyboard className="h-5 w-5 mr-2" />
              Type instead
            </Button>
          </div>
        ) : (
          <form onSubmit={handleTextSubmit} className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[56px] px-6 rounded-2xl border-2 border-input bg-background text-xl focus:outline-none focus:border-primary"
              />
              <Button type="submit" size="icon" className="h-14 w-14">
                <Send className="h-6 w-6" />
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setInputMode('voice')}
            >
              🎤 Switch to voice
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
