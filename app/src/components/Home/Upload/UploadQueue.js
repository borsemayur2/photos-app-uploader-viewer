import React from "react";
import ProgressBar from "./ProgressBar";

const styles = {
  photosList: {
    overflowY: "scroll",
    maxHeight: "60vh",
  },
  card: {
    boxShadow: "0 0 2px 2px lightblue",
    background: "aliceblue",
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
};

const UploadQueue = ({ photos, uploadPercent }) => {
  const renderPhoto = (photo) => {
    return <Photo photo={photo} key={`${photo.id}-photo`} />;
  };
  return (
    <>
      {Boolean(uploadPercent) && <ProgressBar uploadPercent={uploadPercent} />}
      <section style={styles.photosList}>{photos.map(renderPhoto)}</section>
    </>
  );
};

const Photo = ({ photo }) => {
  return <p style={styles.card}>{photo.path}</p>;
};

export default UploadQueue;
