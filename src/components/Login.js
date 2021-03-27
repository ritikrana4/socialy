import React, { useContext, useState } from "react";
import Header from "./Header";
import "../styles/login.css";
import { UsersContext } from "../providers/UsersProvider";
import { Link, Redirect, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import Loading from "./Loading";

function Login({ history }) {
  const [values, setValues] = useState({
    Email: "",
    Password: "",
  });
  const [errors, setErrors] = useState("");
  const [loadings, setLoading] = useState(false);
  const { user, loading } = useContext(UsersContext);

  const handleChange = (event) => {
    //do something when input something
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    //do something on form submit
    event.preventDefault();

    if (isFormValid()) {
      //check if form is valid.
      setErrors("");
      setLoading(true);
      auth
        .signInWithEmailAndPassword(values.Email, values.Password)
        .then(() => history.push("/dashboard"))
        .catch(() => setErrors("Email and Password did not match"));
    }
  };

  const isFormValid = () => {
    let error;

    if (isFormEmpty(values)) {
      //if form empty generate error message
      error = "Please fill all fields";
      setErrors(error);
      return false;
    } else if (!isEmailValid(values)) {
      //check if email formatted or not
      error = "Email is not valid";
      setErrors(error);
      return false;
    } else if (!isPasswordValid(values)) {
      //if password not valid generate error message
      error = "Password is not valid";
      setErrors(error);
      return false;
    } else {
      return true;
    }
  };
  const isFormEmpty = ({ Email, Password }) => {
    if (!Email.length || !Password.length) {
      return true;
    } else {
      return false;
    }
  };

  const isEmailValid = ({ Email }) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (Email.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  };

  const isPasswordValid = ({ Password }) => {
    if (Password.length < 6) {
      return false;
    } else {
      return true;
    }
  };

  const displayErrors = (errors) => (
    <div>
      <p className="errors">{errors}</p>
    </div>
  );
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {user ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>
          {" "}
          <Header />
          <div className="main">
            <div className="login_form">
              <h1 className="login_logo">
                <span>🚀</span> Allink
              </h1>
              <h1 className="login_heading">Login to your Account</h1>

              <form onSubmit={handleSubmit}>
                <input
                  className="input_field"
                  type="text"
                  name="Email"
                  value={values.Email}
                  placeholder="Email"
                  onChange={handleChange}
                ></input>

                <input
                  className="input_field"
                  type="password"
                  name="Password"
                  value={values.Password}
                  placeholder="Password"
                  onChange={handleChange}
                />

                {errors.length > 0 && <div>{displayErrors(errors)}</div>}
                <input
                  type="submit"
                  value={loadings ? "Loading..." : "Login"}
                  disabled={loadings}
                  className={loadings ? "button_loading" : "submit_button"}
                />

                <div className="link">
                  Do not have Account? <Link to="/signup">Signup</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default withRouter(Login);
