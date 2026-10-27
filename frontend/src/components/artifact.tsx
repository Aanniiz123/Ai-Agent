import React from 'react';
import { X, Code, Eye, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const Artifact = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-1/2 min-w-[400px] bg-[#0f0f0f] border-l border-white/5 flex flex-col text-zinc-300">
      <div className="p-3 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-zinc-500 px-2 py-1 rounded-md bg-white/5 border border-white/10">
            DashboardComponent.tsx
          </span>
          <div className="flex bg-zinc-900 rounded-lg p-1 gap-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs transition-all ${activeTab === 'preview' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Eye size={14} /> Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs transition-all ${activeTab === 'code' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Code size={14} /> Code
            </button>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-md">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'code' ? (
          <div className="p-6">
            <div className="flex justify-end mb-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <div className="bg-zinc-950 p-6 rounded-2xl font-mono text-xs text-green-400 border border-white/10 whitespace-pre-wrap leading-relaxed shadow-inner">
              {`export const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold">My Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white shadow rounded">Stat 1</div>
        <div className="p-4 bg-white shadow rounded">Stat 2</div>
        <div className="p-4 bg-white shadow rounded">Stat 3</div>
      </div>
    </div>
  );
};`}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="mb-6 p-8 border-2 border-dashed border-zinc-800 rounded-3xl text-center space-y-4 bg-zinc-900/30">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                <Eye size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-zinc-400 font-medium">Live Preview Rendering</p>
                <p className="text-xs text-zinc-600">The interactive preview will appear here once the component is mounted.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 opacity-40 grayscale">
              <div className="h-32 rounded-2xl bg-zinc-800 animate-pulse"></div>
              <div className="h-32 rounded-2xl bg-zinc-800 animate-pulse"></div>
              <div className="h-32 rounded-2xl bg-zinc-800 animate-pulse"></div>
              <div className="h-32 rounded-2xl bg-zinc-800 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artifact;
