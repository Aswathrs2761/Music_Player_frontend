import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentSong } from "../Context/SongContext";
import { useAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Logout = () => {

  const navigate = useNavigate();
  const { setCurrentSong } = useCurrentSong();
  const [, setAuth] = useAuth();

  useEffect(() => {

    setCurrentSong(null);

    setAuth({
      user: null,
      token: ""
    });

    localStorage.removeItem("auth");

    axios.defaults.headers.common["Authorization"] = "";

    toast.success("Logged out successfully 👋");

    setTimeout(() => {
      navigate("/");
    }, 800);

  }, []);

  return null;
};

export default Logout;