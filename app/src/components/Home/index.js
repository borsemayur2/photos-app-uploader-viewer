import React from "react";
import "./index.css";
import Card from "../common/Card";

const Home = () => {
  return (
    <div className="container">
      <Card to="/upload">
        <h2>Upload Images</h2>
      </Card>
      <Card to="/view">
        <h2>View Uploaded Images</h2>
      </Card>
    </div>
  );
};

export default Home;
