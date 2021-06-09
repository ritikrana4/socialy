import React from "react";
import { Link, useParams } from "react-router-dom";
import Headers from "../../components/Header";
import image from "../../assets/error-404.png";
import "./notfound.css";
function NotFound() {
  let { id } = useParams();
  console.log(id);
  return (
    <div>
      <Headers />
      <div className="notfound-container">
        <div>
          <img className="notfound-image" src={image} />
        </div>
        <div className="notfound-heading">Page Not Found</div>
        <button className="notfound-button">
          {" "}
          <Link style={{ color: "white" }} to="/">
            Go Home
          </Link>
        </button>
      </div>
    </div>
  );
}
export default NotFound;
