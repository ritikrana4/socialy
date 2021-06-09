/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../firebase";
import Header from "../../components/Header";
import "./signup.css";
import { createUserProfileDocument } from "../../firebase";
import { withRouter, Redirect } from "react-router-dom";
import { UsersContext } from "../../providers/UsersProvider";
import Loading from "../../components/Loading";

function Signup({ history }) {
  const [values, setValues] = useState({
    Email: "",
    UserName: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [errors, setErrors] = useState("");
  const [loadings, setLoading] = useState(false);

  const { user, loading } = useContext(UsersContext);

  const handleSubmit = async (event) => {
    //do something on form submit
    event.preventDefault();

    if (isFormValid()) {
      //check if form is valid.
      setErrors("");
      try {
        const snapshot = await firestore.doc(`users/${values.UserName}`).get();

        if (!snapshot.exists) {
          setLoading(true);
          await auth
            .createUserWithEmailAndPassword(values.Email, values.Password)
            .then((user) => {
              console.log(user);
              createUserProfileDocument(
                user,
                values.UserName.toString().toLowerCase()
              );
              createUsersData(user.user, values.UserName);
            })

            .then(() => history.push("/dashboard"));
          //send verification email
          // auth.currentUser.sendEmailVerification({
          //   url: "http://localhost:3000",
          // });
        } else {
          setErrors("UserName already exists.");
        }
      } catch (err) {
        let error = "Account already exists.";
        setErrors(error);
        setLoading(false);
      }
    }
  };
  const createUsersData = async (user, username) => {
    await firestore
      .doc(`usersdata/${user.uid}`)
      .set({
        username: username,
        Name: "",
        Tag: "",
        Bio: "",
        twitter: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        youtube: "",
      });
  };

  const handleChange = (event) => {
    //do something when input something
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const isFormValid = () => {
    let error;

    if (isFormEmpty(values)) {
      //if form empty generate error message
      error = "Please fill all fields";
      setErrors(error);
      return false;
    } else if (!isUserNameValid(values)) {
      error = "UserName already exists.";
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

  const isUserNameValid = ({ UserName }) => {
    let user = UserName.toLowerCase();
    if (
      user === "signup" ||
      user === "login" ||
      user === "home" ||
      user === "dashboard" ||
      user === "404"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = ({ Email, UserName, Password, ConfirmPassword }) => {
    if (
      !Email.length ||
      !UserName.length ||
      !Password.length ||
      !ConfirmPassword
    ) {
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
  const isPasswordValid = ({ Password, ConfirmPassword }) => {
    if (Password.length < 6 || ConfirmPassword.length < 6) {
      return false;
    } else if (Password !== ConfirmPassword) {
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
          <Header />
          <div className="main">
            <div className="login_form">
              <h1 className="login_heading">Create your Account</h1>

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
                  type="text"
                  name="UserName"
                  value={values.UserName}
                  placeholder="UserName"
                  onChange={handleChange}
                />
                <input
                  className="input_field"
                  type="password"
                  name="Password"
                  value={values.Password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <input
                  className="input_field"
                  type="password"
                  name="ConfirmPassword"
                  value={values.ConfirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
                {errors.length > 0 && <div>{displayErrors(errors)}</div>}
                <input
                  type="submit"
                  value={loadings ? "Loading..." : "SignUp"}
                  disabled={loadings}
                  className={loadings ? "button_loading" : "submit_button"}
                />

                <div className="link">
                  Already a member? <Link to="/login">Login</Link>
                </div>
                <div className="form_disclaimer">
                  🔐
                  <br />
                  We will never share your email with 3rd parties <br /> and
                  will always keep your information private.
                </div>
              </form>
            </div>
          </div>
          <div className="footer">© 2021 socialy.me</div>
        </div>
      )}
    </div>
  );
}
export default withRouter(Signup);
