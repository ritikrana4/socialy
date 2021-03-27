import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UsersContext } from "../providers/UsersProvider";
import Header from "./Header";
import Loading from "./Loading";

function Home() {
  const { user, loading } = useContext(UsersContext);

  if (loading) {
    return <Loading />;
  }

  return user ? <Redirect to="/dashboard" /> : <Header />;
}

export default Home;
