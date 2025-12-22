import { useState } from "react";
import google from "../assets/google.png";
import loginHero from "../assets/loginHero.png";
import soldier from "../assets/soldier.png";
import { AiOutlineAim } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/Auth";

const LoginForm = ({ switchToSignup, onSuccess }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      login();
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      <div className="w-full space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Sign In</h1>

        <p className="text-xs sm:text-sm lg:text-md font-medium">
          Don't have an account yet?{" "}
          <button
            type="button"
            onClick={switchToSignup}
            className="text-[#2c60d1] hover:underline"
          >
            Sign up here
          </button>
        </p>

        <hr className="border-t-2 rounded-full border-black/20 my-3" />

        <form onSubmit={handleSubmit} className="w-full mt-4 space-y-2">
          {error && <p className="text-red-600 text-xs font-medium">{error}</p>}

          <div className="flex justify-between font-medium text-sm lg:text-md">
            <label htmlFor="email">Email Address</label>
          </div>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded ring-1 ring-black/20 outline-none"
          />

          <div className="flex justify-between font-medium mt-1 text-sm lg:text-md">
            <label htmlFor="pwd">Password</label>
            <button type="button" className="text-[#2c60d1] hover:underline">
              Forgot password?
            </button>
          </div>

          <input
            id="pwd"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded ring-1 ring-black/20 outline-none"
          />

          <div className="flex justify-center my-3">
            <button
              type="submit"
              disabled={loading}
              className="p-2 text-[#b0be64] bg-[#27395f] rounded-lg font-bold w-full text-sm sm:text-md lg:text-lg hover:bg-[#5d6532] hover:text-white disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="flex justify-center items-center w-full my-4">
            <hr className="border-t-2 rounded-full border-black/20 w-[18%] sm:w-[25%]" />
            <p className="px-7 sm:py-1 text-[10px] sm:text-xs font-medium">
              Or continue with
            </p>
            <hr className="border-t-2 rounded-full border-black/20 w-[18%] sm:w-[25%]" />
          </div>

          <div className="flex flex-col gap-3 justify-center items-center">
            <button
              type="button"
              className="text-xs sm:text-sm bg-gray-50 hover:bg-gray-200 px-4 py-1 sm:py-2 rounded-lg ring ring-gray-400/30 font-medium"
            >
              <div className="flex items-center justify-center gap-4">
                <img src={google} alt="Google" className="h-5 sm:h-6 w-auto" />
                <p>Sign in with Google</p>
              </div>
            </button>

            <p className="text-[10px] sm:text-xs text-center p-2">
              By signing in or creating new account, you are agreeing to our{" "}
              <span className="text-[#2c60d1] hover:underline font-semibold">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-[#2c60d1] hover:underline font-semibold">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </form>
      </div>

      <div className="hidden md:flex">
        <div className="p-2 relative">
          <img
            src={loginHero}
            className="block rounded-3xl h-full w-full object-cover"
          />

          <div className="absolute inset-4 bg-white rounded-3xl flex items-center justify-center"></div>

          <div className="absolute inset-0 bg-[#5d6532]/30 rounded-3xl z-10 text-black text-xs lg:text-sm xl:text-md p-9">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h1 className="text-4xl xl:text-5xl font-bold md:mb-6 xl:mb-8 text-black/60">
                  Continue Your Mission!
                </h1>
              </div>
              <div className="bg-black/50 px-4 py-2 rounded-lg">
                <p className="mb-6 font-bold text-white/80">
                  One-Stop Platform for Tactical Intelligence, Defense Knowledge
                  & Exam Preparation
                </p>
                <div className="space-y-2 text-white/80 font-semibold flex flex-col justify-center items-start mb-6">
                  <div className="flex justify-center items-center gap-2">
                    <AiOutlineAim className="text-2xl" />
                    <p>Tactical intelligence & strategic awareness</p>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <AiOutlineAim className="text-2xl" />
                    <p>Structured learning for defense & military exams</p>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <AiOutlineAim className="text-2xl" />
                    <p>Mission-driven, disciplined preparation</p>
                  </div>
                </div>
                <span className="font-bold text-white/80">
                  Secure access to verified defense learning resources.
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-6 bg-white rounded-3xl flex items-center justify-center">
            <img
              src={soldier}
              className="object-cover rounded-xl w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
