import React from "react";
import ProgressBar from "./ProgressBar";
import "./UploadQueue.css";

const styles = {
  photo: {
    height: "inherit",
  },
  photosList: {
    overflowY: "scroll",
    maxHeight: "60vh",
  },
};

const UploadQueue = ({ photos, uploadPercent }) => {
  const renderPhoto = (photo, index) => {
    return <Photo photo={photo} key={`${photo.id}-photo`} />;
  };
  return (
    <>
      {Boolean(uploadPercent) && (
        <>
          <ProgressBar uploadPercent={uploadPercent} />
        </>
      )}
      <section style={styles.photosList}>{photos.map(renderPhoto)}</section>
    </>
  );
};

const Photo = ({ photo }) => {
  return (
    <span style={styles.photo} className="photo-item">
      <p style={styles.card}>{photo.path}</p>
    </span>
  );
};

export default UploadQueue;
