import api from "../utils/axios";

const createConversation = async (title = "New chat") => {
  try {
    const { data } = await api.post("/chat/conversations", { title });
    return data;
  } catch {
    return null;
  }
};

export default createConversation;
