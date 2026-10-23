import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import type { CurrentUser } from "../../features/get_current_user";
import { useAppDispatch } from "../redux/store";
import { setUserData } from "../redux/userSlice";

function Home() {
  const dispatch = useAppDispatch();

  const handleLogin = async (token: string) => {
    try {
      const { data } = await api.post<CurrentUser>(
        "/auth/google-login",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.error("Backend validation failed:", error);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // CRITICAL FIX: Added await since getIdToken() returns a Promise
      const token = await result.user.getIdToken();
      console.log("Firebase ID Token:", token);

      await handleLogin(token);
      console.log("Firebase User Info:", result.user);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-md mx-4 rounded-2xl border border-green-500/20 bg-zinc-950 p-8 shadow-2xl shadow-green-500/5">

          <div className="flex flex-col items-center justify-center gap-6">

            <div className="h-16 w-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-green-400">
                AI
              </span>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                AI <span className="text-green-400">Agent</span>
              </h1>

              <p className="text-sm text-zinc-400">
                Sign in to continue to your account
              </p>
            </div>

            <div className="w-full space-y-4">
              <button
                onClick={googleLogin}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-green-500 px-4 py-3 font-semibold text-black transition duration-200 hover:bg-green-400 active:scale-[0.98]"
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-green-500/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


