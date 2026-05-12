import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import logo from "../assets/images/SimplyCalo.png";

export default function Login() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 px-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-sm w-full text-center">
        <img src={logo} alt="SimplyCalo" className="w-80 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Welcome to SimplyCalo
        </h1>
        <p className="text-slate-500 mb-8 text-sm">
          Sign in to track your daily meals and reach your goals.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
