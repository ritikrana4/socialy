import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UsersContext } from "../providers/UsersProvider";
import { auth } from "../firebase";
import "./header.css";

function Headers() {
  const { user } = useContext(UsersContext);
  console.log(user, auth);
  return (
    <div>
      <header className="header">
        <div className="header-logo">
          <Link to="/">Socialy</Link>
        </div>
        <div className="header-links">
          <Link className="header-link" to="/login">
            Login
          </Link>
          <Link className="header-link" to="/signup">
            Signup
          </Link>
        </div>
      </header>
    </div>
    /* <Segment>
      <Menu secondary>
        <Link to="/">
          <Menu.Item name="⭐BioMe" />
        </Link>

        {!user ? (
          <Menu.Menu position="right">
            <Link to="/login">
              <Menu.Item name="login" />
            </Link>
            <Link to="/signup">
              <Menu.Item name="signup" />
            </Link>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              name="Logout"
              onClick={() => {
                auth.signOut();
              }}
            />
          </Menu.Menu>
        )}
      </Menu>
    </Segment> */
  );
}

export default Headers;
