import React from "react";
import "./PhotosGrid.css";
import FullScreenView from "./FullScreenView";

const BASE_API = "http://localhost:8000";

const PhotosGrid = (props) => {
  const [showFullScreen, setShowFullScreen] = React.useState(false);
  const [photo, setPhoto] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const { data } = props;

  if (!data.length) return <></>;

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
            key={photo.date}
            className="card"
            onClick={() => showPhoto(photo, index)}
          >
            <img
              className="card-photo"
              src={`${BASE_API}/${photo.filename}`}
              alt={photo.filename}
            />
            <p></p>
          </div>
        );
      })}

      {showFullScreen && (
        <FullScreenView show={showFullScreen} handleClose={hidePhotoFullscreen}>
          <div className="card-fullscreen">
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
