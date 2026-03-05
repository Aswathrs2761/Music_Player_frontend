import { openUploadWidget } from "../utils/CloudinaryServices";
import { Cloudinary_upload_preset } from "../utils/Config";
import { Upload } from "lucide-react";

const CloudinaryUpload = ({ setTrackUrl, setUploadedSongFileName }) => {

  const uploadImageWidget = () => {
    const myUploadWidget = openUploadWidget(
      {
        cloudName: "dsw3le7xc",
        uploadPreset: Cloudinary_upload_preset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setTrackUrl(result.info.secure_url);
          setUploadedSongFileName(result.info.original_filename);
        } else if (error) {
          console.log(error);
        }
      }
    );

    myUploadWidget.open();
  };

  return (
    <button
      onClick={uploadImageWidget}
      className="
        flex items-center justify-center gap-2
        px-4 sm:px-5
        py-2 sm:py-2.5
        text-sm sm:text-base
        bg-indigo-500 hover:bg-indigo-400
        text-white font-medium
        rounded-lg
        transition duration-200
        shadow-lg shadow-indigo-500/20
      "
    >
      <Upload size={16} className="sm:w-[18px] sm:h-[18px]" />
      Select Track
    </button>
  );
};

export default CloudinaryUpload;