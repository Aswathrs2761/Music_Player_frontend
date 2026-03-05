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

  /* ---------------- HANDLE INPUT ---------------- */

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- LOGIN ---------------- */

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

      const authData = {
        user: data.user,
        token: data.token,
      };

      /* SAVE TO CONTEXT */
      setAuth(authData);

      /* SAVE TO LOCAL STORAGE */
      localStorage.setItem("auth", JSON.stringify(authData));

      /* VERY IMPORTANT */
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      toast.success("Login successful 🎉", { id: loadingToast });

      navigate("/Home");

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 md:px-8 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/20 blur-3xl rounded-full -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/20 blur-3xl rounded-full -bottom-20 -right-20"></div>

      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <RiNeteaseCloudMusicLine className="text-2xl sm:text-3xl text-indigo-500" />
          <span className="text-2xl sm:text-3xl font-bold text-white">
            Music
          </span>
        </div>

        <span className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-300 mb-4 text-center block">
          Secure Account Login
        </span>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Email or Username
          </label>

          <input
            type="text"
            name="emailIdOrUserName"
            value={formValue.emailIdOrUserName}
            onChange={handleOnChange}
            placeholder="Enter your email or username"
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formValue.password}
            onChange={handleOnChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-zinc-500 hover:text-white"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* Login */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition"
        >
          Log In
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-zinc-800"></div>
          <span className="px-3 text-xs text-zinc-500">OR</span>
          <div className="flex-grow h-px bg-zinc-800"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-zinc-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 font-medium hover:text-indigo-300 !no-underline"
          >
            Sign up
          </Link>
        </p>

        {/* Forgot password */}
        <p className="text-center text-sm text-zinc-400 mt-2">
          <Link
            to="/forgotpassword"
            className="text-indigo-400 font-medium hover:text-indigo-300 !no-underline"
          >
            Forgot password?
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;