import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function ResetPassword() {
  const { userId, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:4000/api/user/resetPassword/${userId}/${token}`,
        { password }
      );

      if (res.data.success) {
        toast.success("Password reset successful ✨");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 md:px-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #222",
          },
        }}
      />

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
          Reset Password
        </h2>

        <p className="text-gray-400 text-center mb-5 sm:mb-6 text-xs sm:text-sm">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-2">
              New Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 sm:py-3 pr-12 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[42px] sm:top-[45px] cursor-pointer text-gray-400 hover:text-white transition text-sm sm:text-base"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2.5 sm:py-3 pr-12 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />

            <span
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-[42px] sm:top-[45px] cursor-pointer text-gray-400 hover:text-white transition text-sm sm:text-base"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
}