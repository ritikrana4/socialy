import React from "react";
import { Link } from "react-router-dom";
import { Segment, Menu } from "semantic-ui-react";

function Header() {
  return (
    <Segment>
      <Menu secondary>
        <Menu.Item>⭐</Menu.Item>
        <Link to="/">
          <Menu.Item name="home" />
        </Link>

        <Menu.Menu position="right">
          <Link to="/login">
            <Menu.Item name="login" />
          </Link>
          <Link to="/signup">
            <Menu.Item name="signup" />
          </Link>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
}

export default Header;
