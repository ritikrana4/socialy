import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { auth } from "../firebase";
import { UsersContext } from "../providers/UsersProvider";

function PrivateRoute({ user, children, ...rest }) {
  return (
    <Route {...rest} render={() => (user ? children : <Redirect to="/" />)} />
  );
}

export default PrivateRoute;
