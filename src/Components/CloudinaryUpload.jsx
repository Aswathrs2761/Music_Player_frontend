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
        flex items-center gap-2
        px-5 py-2.5
        bg-indigo-500 hover:bg-indigo-400
        text-white font-medium
        rounded-lg
        transition duration-200
        shadow-lg shadow-indigo-500/20
      "
    >
      <Upload size={18} />
      Select Track
    </button>
  );
};

export default CloudinaryUpload;