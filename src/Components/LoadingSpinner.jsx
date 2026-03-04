const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      {/* Glow Background Effect */}
      <div className="absolute w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full"></div>

      {/* Spinner */}
      <div className="relative">
        <div className="w-14 h-14 border-4 border-zinc-700 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>

    </div>
  );
};

export default LoadingSpinner;