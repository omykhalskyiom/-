import React, { useState, useEffect, useRef } from 'react';
import { SupportPinIcon, PaperAirplaneIcon, XIcon, StoreIcon } from './icons/IconComponents';

const CHAT_CLOSE_ANIMATION_DURATION = 200;

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1.5 p-3 rounded-2xl bg-surface">
    <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 bg-primary/50 rounded-full animate-bounce"></div>
  </div>
);

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      content: "Вітаю! Я ваш віртуальний помічник. Чим можу допомогти?",
      timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleChat = () => {
    if (isOpen) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimatingOut(false);
      }, CHAT_CLOSE_ANIMATION_DURATION);
    } else {
      setIsOpen(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const timestamp = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = { role: 'user', content: trimmedInput, timestamp };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botTimestamp = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
      const botMessage: Message = { role: 'model', content: `Дякуємо за ваше повідомлення! Наш оператор скоро зв'яжеться з вами.`, timestamp: botTimestamp };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={toggleChat}
          className={'p-4 rounded-full shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-all duration-300 hover:scale-110 transform ' + (isOpen ? 'bg-surface text-primary-text border border-primary/20' : 'bg-primary-text text-primary animate-chat-pulse')}
          aria-label={isOpen ? "Закрити чат" : "Відкрити чат"}
        >
          <div className="relative h-8 w-8 flex items-center justify-center">
            <div className={`absolute transition-all duration-200 ${isOpen ? 'animate-chat-icon-out' : 'animate-chat-icon-in'}`}>
                <SupportPinIcon className="h-8 w-8" />
            </div>
            <div className={`absolute transition-all duration-200 ${isOpen ? 'animate-chat-icon-in' : 'animate-chat-icon-out'}`}>
                <XIcon className="h-8 w-8" />
            </div>
          </div>
        </button>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden animate-backdrop-fade-in" onClick={toggleChat}></div>}

      {isOpen && (
        <div 
          className={`fixed bottom-24 right-8 z-[45] w-[calc(100vw-4rem)] max-w-sm h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col origin-bottom-right ${isAnimatingOut ? 'animate-chat-close' : 'animate-chat-open'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary/20 flex-shrink-0">
             <div className="flex items-center space-x-3">
                <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center text-white shadow-md">
                        <StoreIcon className="h-6 w-6"/>
                    </div>
                    <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white ring-1 ring-green-500 animate-pulse"></span>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-primary-text">Чат-помічник</h3>
                    <p className="text-xs text-secondary-text">Зазвичай відповідає швидко</p>
                </div>
             </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-surface">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 max-w-[90%] ${msg.role === 'user' ? 'justify-end ml-auto' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <StoreIcon className="h-4 w-4" />
                  </div>
                )}
                <div className={`w-full flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-max p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-lg' : 'bg-white text-primary-text rounded-bl-lg border border-primary/10'}`}>
                    <p className="text-sm break-words">{msg.content}</p>
                  </div>
                   <span className="text-xs text-gray-400 mt-1.5 px-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-primary/20 flex-shrink-0 bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Напишіть повідомлення..."
                disabled={isLoading}
                className="w-full pl-4 pr-12 py-2.5 bg-surface text-primary-text placeholder-secondary-text border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`p-3 bg-primary text-background rounded-full transition-all duration-300 ease-in-out disabled:cursor-not-allowed ${inputValue.trim() ? 'scale-100 opacity-100 hover:bg-highlight' : 'scale-75 opacity-50'}`}
                aria-label="Надіслати"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;