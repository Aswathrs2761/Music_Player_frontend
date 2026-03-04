import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [emailId, setEmailId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailId) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:4000/api/user/forgotPassword",{ emailId });

      if (res.data.success) {
        toast.success("Reset link sent to your email ✨");
        setEmailId("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8">
        
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-purple-500 hover:text-purple-400 transition"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}