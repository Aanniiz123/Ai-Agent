import {
  Plus,
  MessageSquare,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clearUserData } from '../redux/userSlice';
import { setActiveConversation, setConversations } from '../redux/conversation_slice';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector((state) => state.conversation.conversations);
  const user = useAppSelector((state) => state.user.userData);
  const activeConversationId = useAppSelector(
    (state) => state.conversation.activeConversationId,
  );
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await api.get('/chat/list-conversations');
        const nextConversations = data ?? [];
        dispatch(setConversations(nextConversations));

        if (nextConversations.length > 0 && !activeConversationId) {
          dispatch(setActiveConversation(nextConversations[0].id));
        }
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        dispatch(setConversations([]));
      } finally {
        setLoading(false);
      }
    };

    void fetchConversations();
  }, [dispatch]);

  const handleNewChat = async () => {
    try {
      const { data } = await api.post('/chat/conversations', {
        title: 'New chat',
      });

      dispatch(setConversations([data, ...conversations]));
      dispatch(setActiveConversation(data.id));
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const handleSelectConversation = (conversationId: string | number) => {
    dispatch(setActiveConversation(conversationId));
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      dispatch(clearUserData());
    }
  };

  return (
    <div
      className={`${isCollapsed ? 'w-[76px]' : 'w-[260px]'} h-full bg-[#0f0f0f] text-zinc-400 flex flex-col border-r border-white/5 transition-all duration-200`}
    >
      <div className="p-3 border-b border-white/5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleNewChat}
          className={`bg-green-500 hover:bg-green-400 text-black rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all active:scale-95 ${
            isCollapsed ? 'w-10 h-10 p-0' : 'w-full p-3'
          }`}
          aria-label="New chat"
        >
          <Plus size={18} /> {!isCollapsed && 'New chat'}
        </button>

        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-3 flex flex-col gap-1">
        {!isCollapsed && (
          <p className="text-[11px] font-bold text-zinc-600 px-3 py-2 uppercase tracking-wider">
            Recent Chats
          </p>
        )}

        {loading ? (
          <p className={`px-3 py-2 text-xs text-zinc-500 ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '…' : 'Loading chats...'}
          </p>
        ) : conversations.length === 0 ? (
          <p className={`px-3 py-2 text-xs text-zinc-500 ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '—' : 'No chats yet'}
          </p>
        ) : (
          conversations.map((chat) => {
            const isSelected = activeConversationId === chat.id;

            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => handleSelectConversation(chat.id)}
                className={`w-full p-2.5 rounded-lg text-sm cursor-pointer transition-colors truncate flex items-center gap-3 group ${
                  isSelected
                    ? 'bg-green-500/10 text-green-300 border border-green-500/30'
                    : 'hover:bg-white/5 text-zinc-400'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                title={chat.title || 'New chat'}
                aria-label={chat.title || 'New chat'}
              >
                <MessageSquare
                  size={16}
                  className={isSelected ? 'text-green-300' : 'text-zinc-500 group-hover:text-zinc-300'}
                />
                {!isCollapsed && <span className="truncate">{chat.title || 'New chat'}</span>}
              </button>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-white/5 bg-[#0a0a0a]">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-white/5 transition-colors text-sm ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User profile"
                className="w-6 h-6 rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] text-green-500 font-bold border border-green-500/30">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            )}
            {!isCollapsed && (
              <>
                <span className="flex-1 truncate">{user?.name || 'User Account'}</span>
                <User size={16} />
              </>
            )}
          </button>

          <button
            type="button"
            className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-white/5 transition-colors text-sm ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <Settings size={16} />
            {!isCollapsed && <span className="flex-1">Settings</span>}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors text-sm ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={16} />
            {!isCollapsed && <span className="flex-1">Log out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
