import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import Loading from "../../components/Loading";
import { Image } from "semantic-ui-react";
import NotFound from "../notfound/NotFound";
import "./userprofile.css";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

function UserProfile() {
  let { id } = useParams();
  const [avail, setavail] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    console.log(id);
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
  }, [avail, loading]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return avail ? (
    <div className="mainbody">
      <div className="maincontainer">
        <div className="profile">
          <div className="imagecontainer">
            <Image src="rtk.jpg" size="small" />
          </div>
          <h1>Ritik Rana</h1>
          <p className="subheading">Software Engineer</p>
          <p className="paragraph">
            What’s up, I’m ritik. I’m a web developer living in india. I am a
            fan of technology, design, and music. I’m also interested in
            cycling. You can hire me with a click on the button above.
          </p>
          <div className="social">
            <div className="icon">
              <FaFacebookSquare size={35} />
            </div>
            <div className="icon">
              <FaTwitterSquare size={35} />
            </div>
            <div className="icon">
              <FaInstagramSquare size={35} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
}

export default UserProfile;
