import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import CloudinaryUpload from "../../Components/CloudinaryUpload";
import { useAuth } from "../../Context/AuthProvider";
import toast from "react-hot-toast";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [thumbNail, setThumbNail] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      navigate("/Home");
    }
  }, [auth?.token]);

  const getDuration = async (url) => {
    return new Promise((resolve, reject) => {
      const audio = document.createElement("audio");
      audio.src = url;
      audio.preload = "metadata";

      audio.onloadedmetadata = () => {
        const mins = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60)
          .toString()
          .padStart(2, "0");

        resolve(`${mins}:${seconds}`);
      };

      audio.onerror = reject;
    });
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Song name is required");
      return;
    }

    if (!trackUrl) {
      toast.error("Please upload track");
      return;
    }

    if (!thumbNail.trim()) {
      toast.error("Thumbnail image URL is required");
      return;
    }

    try {
      setLoading(true);

      const duration = await getDuration(trackUrl);

      const { data } = await axios.post(
        `${Backend_url}/api/song/create-song`,
        {
          name,
          thumbNail,
          track: trackUrl,
          duration,
        }
      );

      if (!data.success) {
        toast.error(data.message || "Upload failed");
        return;
      }

      toast.success("Song uploaded successfully 🎵");

      setName("");
      setTrackUrl("");
      setThumbNail("");
      setUploadedSongFileName("");

      setTimeout(() => {
        navigate("/Home");
      }, 1000);

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-10">
          🎵 Upload Your Music
        </h1>

        {/* Song Name */}
        <div className="mb-8">
          <label className="block text-sm text-zinc-400 mb-2">
            Song Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter song name"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Thumbnail URL */}
        <div className="mb-10">
          <label className="block text-sm text-zinc-400 mb-2">
            Thumbnail Image URL
          </label>

          <input
            type="text"
            value={thumbNail}
            onChange={(e) => setThumbNail(e.target.value)}
            placeholder="Paste image URL here"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          {/* Live Preview */}
          {thumbNail && (
            <div className="mt-4">
              <img
                src={thumbNail}
                alt="Thumbnail Preview"
                className="w-40 h-40 object-cover rounded-xl border border-zinc-700"
              />
            </div>
          )}
        </div>

        {/* Track Upload */}
        <div className="mb-10">
          <label className="block text-sm text-zinc-400 mb-4">
            Upload Track
          </label>

          {uploadedSongFileName ? (
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white">
              {uploadedSongFileName}
            </div>
          ) : (
            <CloudinaryUpload
              setTrackUrl={setTrackUrl}
              setUploadedSongFileName={setUploadedSongFileName}
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-medium transition ${
            loading
              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Uploading..." : "Upload Song"}
        </button>

      </div>
    </MainLayout>
  );
};

export default UploadSong;