import React, { useState } from "react";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Backend_url } from "../utils/Config";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [formValue, setFormValue] = useState({
    emailIdOrUserName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleLogin = async () => {
    if (!formValue.emailIdOrUserName || !formValue.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const loadingToast = toast.loading("Logging in...");

    try {
      const { data } = await axios.post(
        `${Backend_url}/api/user/login`,
        formValue
      );

      if (!data.success) {
        toast.dismiss(loadingToast);
        toast.error(data.message || "Invalid credentials");
        return;
      }

      setAuth({
        ...auth,
        user: data.user,
        token: data.token,
      });

      localStorage.setItem("auth", JSON.stringify(data));

      toast.success("Login successfull ", { id: loadingToast });

      setTimeout(() => navigate("/Home"), 1000);

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow effect */}
      <div className="absolute w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-600/20 blur-3xl rounded-full -bottom-20 -right-20"></div>

      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <RiNeteaseCloudMusicLine className="text-3xl text-indigo-500" />
          <span className="text-3xl font-bold text-white">
            Music
          </span>
        </div>
        <div>
          <span className="text-2xl font-semibold text-zinc-300 mb-4 text-center block">
            Secure Account Login
          </span>
        </div>


        {/* Email */}
        <div className="mb-4">
          <label className="block text-md font-medium text-zinc-400 mb-3">
            Email or Username
          </label>
          <input
            type="text"
            name="emailIdOrUserName"
            value={formValue.emailIdOrUserName}
            onChange={handleOnChange}
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Enter your email or username"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-md font-medium text-zinc-400 mb-3">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formValue.password}
            onChange={handleOnChange}
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10 transition"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[53px] text-zinc-500 hover:text-white transition"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-lg transition duration-200 font-medium shadow-lg shadow-indigo-500/20"
        >
          Log In
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-zinc-800"></div>
          <span className="px-3 text-xs text-zinc-500">OR</span>
          <div className="flex-grow h-px bg-zinc-800"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-zinc-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 font-medium transition hover:text-indigo-300 !no-underline hover:!no-underline"
          >
            Sign up
          </Link>
        </p>

        <p className="text-center text-sm text-zinc-400">
          <Link
            to="/forgotpassword"
            className="text-indigo-400 font-medium transition hover:text-indigo-300 !no-underline hover:!no-underline"
          >
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;