import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentSong } from "../Context/SongContext";
import { useAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentSong } = useCurrentSong();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const handleLogout = () => {
      // Clear song
      setCurrentSong(null);

      // Clear auth context
      setAuth({
        user: null,
        token: "",
      });

      // Clear local storage
      localStorage.removeItem("auth");

      // Show notification
      toast.success("Logged out successfully 👋");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 800);
    };

    handleLogout();
  }, []); // ✅ runs once only

  return null; // No UI needed
};

export default Logout;