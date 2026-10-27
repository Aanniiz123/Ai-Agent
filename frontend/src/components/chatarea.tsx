import { useState } from 'react';
import { SendHorizontal, User, Bot } from 'lucide-react';

const ChatArea = () => {
  const [input, setInput] = useState('');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] text-zinc-200 relative min-w-0">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto w-full space-y-8 py-8">

          {/* AI Welcome */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
              <Bot size={18} />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm leading-relaxed text-zinc-300">Hello! I'm your AI Agent. How can I help you build something amazing today?</p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex-1 max-w-[80%] space-y-2 text-right">
              <p className="text-sm leading-relaxed bg-zinc-900 p-3 rounded-2xl rounded-tr-none inline-block text-zinc-200 border border-white/5">
                Can you help me design a React component for a dashboard?
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <User size={18} />
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
              <Bot size={18} />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm leading-relaxed text-zinc-300">
                Certainly! I have created a sleek, modern design for your dashboard. You can see the code and interactive preview in the <strong className="text-green-400">Artifact pane</strong> on the right.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="p-6 flex justify-center">
        <div className="w-full max-w-3xl relative flex items-end gap-2 bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-green-500/50 transition-all">
          <textarea
            className="flex-1 bg-transparent border-none outline-none text-sm p-3 resize-none max-h-40 placeholder:text-zinc-600"
            placeholder="Message AI..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                // handle send
              }
            }}
          />
          <button className="bg-green-500 text-black w-10 h-10 rounded-xl flex items-center justify-center hover:bg-green-400 transition-all active:scale-90 shadow-lg shadow-green-500/20">
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
