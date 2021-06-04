/* eslint-disable react/prop-types */
import React from "react";
import { Redirect, Route } from "react-router";

function PrivateRoute({ user, children, ...rest }) {
  return (
    <Route {...rest} render={() => (user ? children : <Redirect to="/" />)} />
  );
}

export default PrivateRoute;
