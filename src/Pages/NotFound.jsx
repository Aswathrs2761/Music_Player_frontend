import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-md sm:max-w-lg">

        {/* Big 404 */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
          Oops... Page Not Found
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base mb-6 sm:mb-8">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/Home")}
          className="bg-indigo-600 hover:bg-indigo-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-white text-sm sm:text-base font-medium transition"
        >
          Go Back Home
        </button>

      </div>
    </div>
  );
};

export default NotFound;