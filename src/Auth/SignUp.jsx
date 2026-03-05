import axios from "axios";
import React, { useState } from "react";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Backend_url } from "../utils/Config";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formValue, setFormValue] = useState({
    emailId: "",
    userName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSignup = async () => {
    if (!formValue.emailId || !formValue.userName || !formValue.password) {
      toast.error("Please fill all fields");
      return;
    }

    const loadingToast = toast.loading("Creating account...");

    try {
      const { data } = await axios.post(
        `${Backend_url}/api/user/register-user`,
        formValue
      );

      if (!data.success) {
        toast.dismiss(loadingToast);
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully 🎉", {
        id: loadingToast,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
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

        <div>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-300 mb-6 text-center block">
            Create your account
          </span>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="emailId"
            value={formValue.emailId}
            onChange={handleOnChange}
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Enter your email"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={formValue.userName}
            onChange={handleOnChange}
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Choose a username"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm text-zinc-400 mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formValue.password}
            onChange={handleOnChange}
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10 transition"
            placeholder="Create a password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[42px] sm:top-[46px] text-zinc-500 hover:text-white transition"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>

          <p className="text-xs text-zinc-500 mt-1">
            Must be 8-20 characters long.
          </p>
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white py-2.5 rounded-lg transition duration-200 font-medium shadow-lg shadow-indigo-500/20"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-zinc-800"></div>
          <span className="px-3 text-xs text-zinc-500">OR</span>
          <div className="flex-grow h-px bg-zinc-800"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-indigo-400 font-medium transition hover:text-indigo-300"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUp;