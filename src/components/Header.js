import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Segment, Menu } from "semantic-ui-react";
import { UsersContext } from "../providers/UsersProvider";
import { auth } from "../firebase";

function Headers() {
  const { user } = useContext(UsersContext);

  return (
    <Segment>
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
    </Segment>
  );
}

export default Headers;
