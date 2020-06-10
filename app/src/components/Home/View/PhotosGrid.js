import React, { useRef, useCallback } from "react";
import "./PhotosGrid.css";
import FullScreenView from "./FullScreenView";

const BASE_API = "http://localhost:8000";

const PhotosGrid = (props) => {
  const [showFullScreen, setShowFullScreen] = React.useState(false);
  const [photo, setPhoto] = React.useState("");
  const [index, setIndex] = React.useState(0);

  const { data } = props;

  const observer = useRef();

  const lastPhotoRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        props.setCurrentPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  if (!data.length) return <h2>Photos not uploaded</h2>;

  const showPhoto = (photo, index) => {
    setShowFullScreen(true);
    setPhoto(photo);
    setIndex(index);
  };

  const changePhoto = (i) => {
    setPhoto(data[i]);
    setIndex(i);
  };

  const hidePhotoFullscreen = () => setShowFullScreen(false);

  return (
    <div className="grid-container">
      {data.map((photo, index) => {
        return (
          <div
            ref={data.length === index + 1 ? lastPhotoRef : null}
            key={photo.filename}
            className="card"
            onClick={() => showPhoto(photo, index)}
          >
            <img
              className="card-photo"
              src={`${BASE_API}/${photo.filename}`}
              alt={photo.filename}
            />
          </div>
        );
      })}

      {showFullScreen && (
        <FullScreenView show={showFullScreen} handleClose={hidePhotoFullscreen}>
          <div
            className="card-fullscreen"
            ref={
              data[data.length - 1].filename === photo.filename
                ? lastPhotoRef
                : null
            }
          >
            <p>{photo.filename.split(".")[0]}</p>
            <p>{new Date(photo.date).toLocaleString()}</p>
            <div className="carousel">
              {index > 0 && (
                <button onClick={() => changePhoto(index - 1)}>Prev</button>
              )}
              <img
                className="card-photo-fullscreen"
                src={`${BASE_API}/${photo.filename}`}
                alt={photo.filename}
              />
              {index < data.length - 1 && (
                <button onClick={() => changePhoto(index + 1)}>Next</button>
              )}
            </div>
          </div>
        </FullScreenView>
      )}
    </div>
  );
};

export default PhotosGrid;
