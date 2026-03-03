import { openUploadWidget } from "../utils/CloudinaryServices";
import { Cloudinary_upload_preset } from "../utils/Config";

const CloudinaryUpload = ({setTrackUrl,setUploadedSongFileName}) =>{
    const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(  
        {
            cloudName : "dsw3le7xc",
            uploadPreset : Cloudinary_upload_preset ,
            sources: ['local'],
        },
        function (error, result) {
            if(!error && result.event === "success")
            {
                setTrackUrl(result.info.secure_url)
                setUploadedSongFileName(result.info.original_filename)
                // props.onImageUpload(result.info.public_id);
            }
            else
            {
                if(error)
                {
                    console.log(error);
                }
            }    
        }
    )
    myUploadWidget.open()
}
    return(
        <button className="" style={{padding: '10px',border : 'none',borderRadius : '20px',fontWeight : "bold" }} onClick={uploadImageWidget}>
            Select track
        </button>
    )

}

export default CloudinaryUpload