import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UsersContext } from "../../providers/UsersProvider";
import Headers from "../../components/Header";
import Loading from "../../components/Loading";
import "./home.css";
import image from "../../assets/2.jpg";
function Home() {
  const { user, loading } = useContext(UsersContext);

  if (loading) {
    return <Loading />;
  }

  return user ? (
    <Redirect to="/dashboard" />
  ) : (
    <div>
      <Headers />
      <div className="main-container">
        <div>
          <div className="main-heading">The Only Page you will Need</div>
          <div className="main-subheading">
            Create a page to promote who you are and what you do in one link.
          </div>

          <button className="main-button">
            <Link to="/signup" style={{ color: "white" }}>
              Get Started
            </Link>
          </button>
          <div className="link">
            Already a member? <Link to="/login">Login</Link>
          </div>
        </div>
        <div>
          <img src={image} className="main-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
