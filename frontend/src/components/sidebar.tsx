import { Plus, MessageSquare, User, Settings, LogOut } from 'lucide-react';
import api from '../../utils/axios';
import { useAppDispatch } from '../redux/store';
import { clearUserData } from '../redux/userSlice';

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      dispatch(clearUserData());
    }
  };

  return (
    <div className="w-[260px] h-full bg-[#0f0f0f] text-zinc-400 flex flex-col border-r border-white/5">
      <div className="p-4">
        <button className="w-full p-3 bg-green-500 hover:bg-green-400 text-black rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all active:scale-95">
          <Plus size={18} /> New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
        <p className="text-[11px] font-bold text-zinc-600 px-3 py-2 uppercase tracking-wider">Recent Chats</p>
        {['Project Planning 2026', 'React Component Debugging', 'Rust Token Killer Analysis', 'Frontend Design Draft'].map((chat, i) => (
          <div key={i} className="p-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/5 transition-colors truncate flex items-center gap-3 group">
            <MessageSquare size={16} className="text-zinc-500 group-hover:text-zinc-300" />
            <span className="truncate">{chat}</span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/5 bg-[#0a0a0a]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-white/5 transition-colors text-sm">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] text-green-500 font-bold border border-green-500/30">U</div>
            <span className="flex-1 truncate">User Account</span>
            <User size={16} />
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-white/5 transition-colors text-sm">
            <Settings size={16} />
            <span className="flex-1">Settings</span>
          </div>
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors text-sm"
          >
            <LogOut size={16} />
            <span className="flex-1">Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
