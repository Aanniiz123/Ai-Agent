import api from "../utils/axios";

const getconservation = async () => {
  try {
    const { data } = await api.get("/chat/list-conversations");
    return data;
  } catch {
    return null;
  }
};

export default getconservation;
