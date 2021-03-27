import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import Dashboard from "./components/Dashboard";
import "semantic-ui-css/semantic.min.css";
import PrivateRoute, { AuthRoute } from "./components/AuthRoute";
import { useContext } from "react";
import { UsersContext } from "./providers/UsersProvider";
import NotFound from "./components/NotFound";

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
      <Route path="/:id" component={UserProfile} />
      <Route path="/404" component={NotFound} />
    </Switch>
  );
}

export default App;
