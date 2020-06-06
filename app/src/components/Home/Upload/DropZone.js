import React from "react";
import { useDropzone } from "react-dropzone";

const styles = {
  dropzoneContainer: {
    height: "20vh",
    border: "4px dashed lightblue",
  },
  dropzoneContent: {
    marginTop: "10vh",
  },
};

const DropZone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div {...getRootProps()} style={styles.dropzoneContainer}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p style={styles.dropzoneContent}>Release to drop images here</p>
        ) : (
          <p style={styles.dropzoneContent}>Drag 'n' Drop or select images</p>
        )}
      </div>
    </div>
  );
};

export default DropZone;
