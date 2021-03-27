import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";

import NotFound from "./NotFound";

function UserProfile() {
  let { id } = useParams();
  const [avail, setavail] = useState(false);
  const [loading, setloading] = useState(true);

  firestore
    .doc(`users/${id}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        setavail(false);
        setloading(false);
      } else {
        setavail(true);
        setloading(false);
      }
    });

  if (loading) {
    return <div>Loading..</div>;
  }
  return avail ? <div>yes</div> : <NotFound />;
}

export default UserProfile;
