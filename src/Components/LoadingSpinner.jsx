const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      {/* Glow Background Effect */}
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-indigo-600/20 blur-3xl rounded-full"></div>

      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-[3px] sm:border-4 border-zinc-700 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>

    </div>
  );
};

export default LoadingSpinner;