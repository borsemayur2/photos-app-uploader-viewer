import React from "react";
import "./index.css";
import Card from "../common/Card";
import Upload from "./Upload";
import View from "./View";

const Home = () => {
  return (
    <div className="container">
      <Card to="/upload">
        <Upload />
      </Card>
      <Card to="/view">
        <View />
      </Card>
    </div>
  );
};

export default Home;
