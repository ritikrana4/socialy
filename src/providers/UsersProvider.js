import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UsersContext = createContext({ user: null, loading: true });

class UsersProvider extends React.Component {
  state = { user: null, loading: true };

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      this.setState({ user: userAuth, loading: false });
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    const { children } = this.props;
    return (
      <UsersContext.Provider value={this.state}>
        {children}
      </UsersContext.Provider>
    );
  }
}

export default UsersProvider;
