import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function PhoneSignIn() {
  // If null, no SMS has been sent

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      }
    );
  }, []);

  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier);
    setConfirm(confirmation);
  }

  async function confirmCode(event) {
    event.preventDefault();
    try {
      await confirm.confirm(code);
      alert("user login");
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  const handleChange = (event) => {
    //do something when input something
    setCode(event.target.value);
  };

  if (!confirm) {
    return (
      <button
        id="sign-in-button"
        onClick={() => signInWithPhoneNumber("+919012365934")}
      >
        Sign in
      </button>
    );
  }

  return (
    <>
      <form onSubmit={confirmCode}>
        <label>
          Otp:
          <input
            value={code}
            type="number"
            name="code"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default PhoneSignIn;
