import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import UsersProvider from "./providers/UsersProvider";

function Root() {
  return (
    <UsersProvider>
      <Router>
        <App />
      </Router>
    </UsersProvider>
  );
}

export default Root;
