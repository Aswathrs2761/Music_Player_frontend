import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">

        {/* Big 404 */}
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-6">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-4">
          Oops... Page Not Found
        </h2>

        <p className="text-zinc-400 mb-8">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-medium transition"
        >
          Go Back Home
        </button>

      </div>
    </div>
  );
};

export default NotFound;