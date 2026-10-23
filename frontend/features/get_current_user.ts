import api from "../utils/axios";

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  firebase_uid: string;
  created_at: string;
};

const getcurrentuser = async (): Promise<CurrentUser | null> => {
  try {
    const { data } = await api.get<CurrentUser>("/auth/me");
    return data;
  } catch {
    return null;
  }
};

export default getcurrentuser;
