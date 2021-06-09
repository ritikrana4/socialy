import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyB8dS4mozmqfwtrRwxrzYsn-5wDaYPAltc",
  authDomain: "login-ce2eb.firebaseapp.com",
  databaseURL: "https://login-ce2eb.firebaseio.com",
  projectId: "login-ce2eb",
  storageBucket: "login-ce2eb.appspot.com",
  messagingSenderId: "225100713289",
  appId: "1:225100713289:web:ce5321d1bf36ff56961e98",
  measurementId: "G-GXM96XTP31",
};
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const createUserProfileDocument = async (user, userName) => {
  console.log(user);
  await firestore
    .doc(`users/${userName}`)
    .set({ userName: userName, uid: user.user.uid, updated: false });
};

export const updateBio = async (
  uid,
  username,
  Name,
  Tag,
  Bio,
  twitter,
  facebook,
  instagram,
  linkedin,
  youtube
) => {
  await firestore
    .doc(`usersdata/${uid}`)
    .set({
      Name,
      username,
      Tag,
      Bio,
      twitter,
      facebook,
      instagram,
      linkedin,
      youtube,
    });
};

export default firebase;
