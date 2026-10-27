import { useEffect, useState } from "react";
import Home from "./pages/home";
import getcurrentuser from "../features/get_current_user";
import api from "../utils/axios";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { clearUserData, setUserData } from "./redux/userSlice";
import Sidebar from "./components/sidebar";
import ChatArea from "./components/chatarea";
import Artifact from "./components/artifact";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const current = await getcurrentuser();
      dispatch(setUserData(current));
      setLoading(false);
    };
    void loadUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      dispatch(clearUserData());
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-zinc-400">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Home />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-black text-white">
      <Sidebar />
      <ChatArea />
      <Artifact />
    </div>
  );
}

export default App;
