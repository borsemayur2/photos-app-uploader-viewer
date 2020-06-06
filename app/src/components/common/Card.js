import React from "react";
import { Link } from "react-router-dom";

const styles = {
  cardStyle: {
    background: "aliceblue",
    height: "60vh",
    width: "30vw",
    boxShadow: "0 0 2px 2px lightblue",
    borderRadius: 20,
    // marginTop: 50,
  },

  cardContentStyle: {
    paddingTop: "40%",
  },
};

const Card = (props) => {
  return (
    <div>
    <Link to={props.to} className="upload">
      <div style={styles.cardStyle} className="Card">
        <div style={styles.cardContentStyle}>{props.children}</div>
      </div>
    </Link>
        </div>
  );
};

export default Card;
