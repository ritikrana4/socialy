import { Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import UserProfile from "./pages/userprofile/UserProfile";
import Dashboard from "./pages/dashboard/Dashboard";
import "semantic-ui-css/semantic.min.css";
import PrivateRoute from "./components/AuthRoute";
import { useContext } from "react";
import { UsersContext } from "./providers/UsersProvider";
import NotFound from "./pages/notfound/NotFound";
import PhoneSignIn from "./pages/Signupmobile";
import React from "react";

function App() {
  const { user } = useContext(UsersContext);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

      <PrivateRoute path="/dashboard" user={user}>
        <Dashboard />
      </PrivateRoute>

      <Route path="/phone" component={PhoneSignIn} />
      <Route path="/:id" component={UserProfile} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
