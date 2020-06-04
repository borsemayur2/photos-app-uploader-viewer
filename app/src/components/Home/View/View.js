import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotosGrid from "./PhotosGrid";

const PHOTOS_API = "http://localhost:8000/photos";

const View = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, [currentPage]);

  const fetchPhotos = () => {
    const { pageCount } = paginationInfo;

    if (currentPage > pageCount) {
      return;
    }

    axios(getUrl())
      .then((response) => {
        const {
          result,
          meta,
          meta: { currentPage },
        } = response.data;
        setPhotos((photos) => [...photos, ...result]);
        setPaginationInfo(meta);
      })
      .catch((err) => console.log(err));
  };

  const getUrl = () => `${PHOTOS_API}?currentPage=${currentPage}`;
  // const getUrl = () => `https://picsum.photos/v2/list?page=${currentPage}`;
  return (
    <>
      <PhotosGrid data={photos} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default View;
