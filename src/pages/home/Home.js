import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UsersContext } from "../../providers/UsersProvider";
import Headers from "../../components/Header";
import Loading from "../../components/Loading";

function Home() {
  const { user, loading } = useContext(UsersContext);

  if (loading) {
    return <Loading />;
  }

  return user ? <Redirect to="/dashboard" /> : <Headers />;
}

export default Home;
