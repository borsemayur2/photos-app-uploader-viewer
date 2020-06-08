import React from "react";
import UploadQueue from "./UploadQueue";
import DropZone from "./DropZone";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PHOTOS_UPLOAD_API = "http://localhost:8000/upload";

const styles = {
  container: {
    width: "85vw",
    margin: "auto",
  },
};

const Upload = () => {
  const [photos, setPhotos] = React.useState([]);
  const [uploadPercent, setUploadPercent] = React.useState(0);

  const onDrop = React.useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    setPhotos(acceptedFiles);
    setUploadPercent(0);
  }, []);

  const isUploading = () => uploadPercent > 0 && uploadPercent < 100;
  const isUploaded = () => uploadPercent === 100;

  const clearStates = () => {
    setPhotos([]);
    setUploadPercent(0);
  };

  const uploadFiles = () => {
    const formData = new FormData();
    for (const photo of photos) {
      formData.append("photos", photo);
    }
    axios
      .post(PHOTOS_UPLOAD_API, formData, {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadPercent(percentCompleted);
        },
      })
      .then((response) => {
        toast(response.data, { type: "success", position: "top-center" });
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error.message);
        }
        console.log(error);
        toast("Images upload failed ", {
          type: "error",
          position: "top-center",
        });
      });
  };

  return (
    <div style={styles.container}>
      {!isUploading() && (
        <DropZone onDrop={onDrop} accept={"image/*"} multiple={true} />
      )}
      {Boolean(photos.length) && (
        <>
          <UploadQueue
            uploadPercent={uploadPercent}
            style={styles.photos}
            photos={photos}
          />
          <button
            onClick={isUploaded() ? clearStates : uploadFiles}
            disabled={isUploading()}
          >
            {isUploaded() ? "Clear" : "Upload"}
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Upload;
