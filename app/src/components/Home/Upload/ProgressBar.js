import React from "react";

const styles = {
  progressBar: {
    height: 20,
    borderRadius: 10,
    width: "100%",
    background: "lightgrey",
  },
};

const ProgressBar = ({ uploadPercent }) => (
  <div style={styles.progressBar}>
    <div
      style={{
        ...styles.progressBar,
        background: "lightgreen",
        width: `${uploadPercent}%`,
      }}
    ></div>
  </div>
);

export default ProgressBar;
