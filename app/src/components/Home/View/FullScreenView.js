import React from "react";

const styles = {
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.8)",
  },
};

export default function FullScreenView({ show, children, handleClose }) {
  return (
    <div style={styles.modal}>
      <section className="modal-main">
        <button onClick={handleClose}>Close</button>
        {children}
      </section>
    </div>
  );
}
