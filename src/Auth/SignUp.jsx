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
        navigate("/login");
      }, 1000);

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <RiNeteaseCloudMusicLine className="text-3xl text-indigo-500" />
          <span className="text-2xl font-bold text-white">
            Music
          </span>
        </div>

        <h1 className="text-xl font-semibold text-center text-slate-200 mb-6">
          Create your account
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-slate-400 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="emailId"
            value={formValue.emailId}
            onChange={handleOnChange}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm text-slate-400 mb-1">
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={formValue.userName}
            onChange={handleOnChange}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Choose a username"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm text-slate-400 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formValue.password}
            onChange={handleOnChange}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-slate-400"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          <p className="text-xs text-slate-500 mt-1">
            Must be 8-20 characters long.
          </p>
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200 font-medium"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;