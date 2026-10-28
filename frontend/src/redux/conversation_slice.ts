import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string | number;
  title?: string;
  participantIds: string[];
  messages: Message[];
}

interface ConversationState {
  conversations: Conversation[];
  activeConversationId: string | number | null;
}

const initialState: ConversationState = {
  conversations: [],
  activeConversationId: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setActiveConversation: (
      state,
      action: PayloadAction<string | number | null>,
    ) => {
      state.activeConversationId = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{ conversationId: string; message: Message }>
    ) => {
      const convo = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (convo) {
        convo.messages.push(action.payload.message);
      }
    },
    clearConversations: (state) => {
      state.conversations = [];
      state.activeConversationId = null;
    },
  },
});

export const {
  setConversations,
  setActiveConversation,
  addMessage,
  clearConversations,
} = conversationSlice.actions;
export default conversationSlice.reducer;