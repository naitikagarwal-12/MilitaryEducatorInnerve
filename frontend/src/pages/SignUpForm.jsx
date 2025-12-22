import { useState } from "react";
import google from "../assets/google.png";
import loginHero from "../assets/loginHero.png";
import soldier from "../assets/soldier.png";
import { AiOutlineAim } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../api/Auth";

const SignUpForm = ({ switchToLogin, onSuccess }) => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      login(); // auto login
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      {/* LEFT IMAGE PANEL */}
      <div className="hidden md:flex">
        <div className="p-2 relative">
          <img
            src={loginHero}
            className="block rounded-3xl w-full object-cover"
            alt="Hero"
          />

          <div className="absolute inset-4 bg-white rounded-3xl" />

          <div className="absolute inset-0 bg-[#5d6532]/30 rounded-3xl z-10 p-9">
            <div className="flex flex-col justify-between h-full">
              <h1 className="text-4xl xl:text-5xl font-bold text-black/60">
                Begin Your Mission!
              </h1>

              <div className="bg-black/50 px-4 py-2 rounded-lg">
                <p className="mb-6 font-bold text-white/80">
                  Join the One-Stop Platform for Tactical Intelligence, Defense
                  Knowledge & Exam Preparation
                </p>

                <div className="space-y-2 text-white/80 font-semibold">
                  <div className="flex gap-2">
                    <AiOutlineAim className="text-2xl" />
                    <p>Create your secure defense learning profile</p>
                  </div>
                  <div className="flex gap-2">
                    <AiOutlineAim className="text-2xl" />
                    <p>Access structured military & defense exam pathways</p>
                  </div>
                  <div className="flex gap-2">
                    <AiOutlineAim className="text-2xl" />
                    <p>Train with discipline, strategy, and purpose</p>
                  </div>
                </div>

                <span className="block mt-4 font-bold text-white/80">
                  Verified resources • Secure access • Mission-ready learning
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-6 bg-white rounded-3xl">
            <img
              src={soldier}
              className="object-cover rounded-xl w-full h-full"
              alt="Soldier"
            />
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Sign Up</h1>

        <p className="text-xs sm:text-sm lg:text-md font-medium">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-[#2c60d1] hover:underline"
          >
            Sign in here
          </button>
        </p>

        <hr className="border-t-2 rounded-full border-black/20 my-3" />

        <form onSubmit={handleSubmit} className="w-full mt-4 space-y-2">
          {error && <p className="text-red-600 text-xs font-medium">{error}</p>}

          <label className="font-medium text-sm lg:text-md">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full p-2 rounded ring-1 ring-black/20 outline-none"
            required
          />

          <label className="font-medium text-sm lg:text-md">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full p-2 rounded ring-1 ring-black/20 outline-none"
            required
          />

          <label className="font-medium text-sm lg:text-md">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 rounded ring-1 ring-black/20 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 p-2 text-[#b0be64] bg-[#27395f] rounded-lg font-bold w-full hover:bg-[#5d6532] hover:text-white disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="flex justify-center items-center w-full my-4">
            <hr className="border-t-2 rounded-full border-black/20 w-[25%]" />
            <p className="px-6 text-[10px] sm:text-xs font-medium">
              Or continue with
            </p>
            <hr className="border-t-2 rounded-full border-black/20 w-[25%]" />
          </div>

          <div className="flex flex-col gap-3 items-center">
            <button
              type="button"
              className="text-xs sm:text-sm bg-gray-50 hover:bg-gray-200 px-4 py-2 rounded-lg ring ring-gray-400/30 font-medium"
            >
              <div className="flex items-center gap-4">
                <img src={google} alt="Google" className="h-5 sm:h-6" />
                <p>Sign up with Google</p>
              </div>
            </button>

            <p className="text-[10px] sm:text-xs text-center p-2">
              By creating an account, you agree to our{" "}
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
    </div>
  );
};

export default SignUpForm;
