import { useEffect, useState } from "react";
import Home from "./pages/home";
import getcurrentuser from "../features/get_current_user";
import api from "../utils/axios";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { clearUserData, setUserData } from "./redux/userSlice";

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
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md mx-4 rounded-2xl border border-green-500/20 bg-zinc-950 p-8 text-center space-y-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt=""
            className="mx-auto h-16 w-16 rounded-full"
          />
        ) : null}
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-sm text-zinc-400">{user.email}</p>
        <button
          onClick={handleLogout}
          className="w-full rounded-xl bg-green-500 px-4 py-3 font-semibold text-black hover:bg-green-400"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default App;
