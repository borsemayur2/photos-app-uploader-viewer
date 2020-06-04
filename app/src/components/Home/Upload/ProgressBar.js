import React from "react";

const styles = {
  progressBar: {
    height: 20,
    borderRadius: 10,
    width: "100%",
    background: "lightgrey",
    marginTop: 10,
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
    >
      {`${uploadPercent}% completed`}
    </div>
  </div>
);

export default ProgressBar;
