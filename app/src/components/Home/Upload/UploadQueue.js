import React from "react";
import ProgressBar from "./ProgressBar";

const styles = {
  photo: {
    height: "inherit",
  },
  photosList: {
    overflowY: "scroll",
    maxHeight: "45vh",
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
          <p>{`${uploadPercent}% completed`}</p>
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
