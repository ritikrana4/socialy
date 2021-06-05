import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import Loading from "../../components/Loading";
import { Image } from "semantic-ui-react";
import NotFound from "../notfound/NotFound";
import "./userprofile.css";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutubeSquare,
} from "react-icons/fa";

function UserProfile() {
  let { id } = useParams();
  const [avail, setavail] = useState(false);
  const [loading, setloading] = useState(true);
  const [userdata, setUserdata] = useState("");

  // useEffect(() => {
  //   console.log(id);
  //   firestore
  //     .doc(`users/${id}`)
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         setavail(false);
  //         setloading(false);
  //       } else {
  //         setavail(true);
  //         setloading(false);
  //       }
  //     });
  // }, [avail, loading]);

  useEffect(() => {
    getUserData();
  }, [avail]);

  const getUserData = async () => {
    try {
      const snapshot = await firestore.doc(`users/${id}`).get();

      if (snapshot.exists) {
        const { uid } = snapshot.data();

        const data = await firestore.doc(`usersdata/${uid}`).get();
        await setUserdata(data.data());
        console.log(userdata);
        setavail(true);
        setloading(false);
      } else {
        setavail(false);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <h1>{userdata.Name}</h1>
          <p className="subheading">{userdata.Tag}</p>
          <p className="paragraph">{userdata.Bio}</p>
          <div className="social">
            {userdata.facebook ? (
              <div className="icon">
                <Link
                  to={{
                    pathname: `https://facebook.com/${userdata.facebook}`,
                  }}
                  target="_blank"
                >
                  <FaFacebookSquare size={35} />
                </Link>
              </div>
            ) : (
              <></>
            )}
            {userdata.twitter ? (
              <div className="icon">
                <Link
                  to={{
                    pathname: `https://twitter.com/${userdata.twitter}`,
                  }}
                  target="_blank"
                >
                  <FaTwitterSquare size={35} />
                </Link>
              </div>
            ) : (
              <></>
            )}
            {userdata.instagram ? (
              <div className="icon">
                <Link
                  to={{
                    pathname: `https://instagram.com/${userdata.instagram}`,
                  }}
                  target="_blank"
                >
                  <FaInstagramSquare size={35} />
                </Link>
              </div>
            ) : (
              <></>
            )}
            {userdata.linkedin ? (
              <div className="icon">
                <Link
                  to={{
                    pathname: `https://linkedin.com/${userdata.linkedin}`,
                  }}
                  target="_blank"
                >
                  <FaLinkedin size={35} />
                </Link>
              </div>
            ) : (
              <></>
            )}
            {userdata.youtube ? (
              <div className="icon">
                <Link
                  to={{
                    pathname: `https://youtube.com/${userdata.youtube}`,
                  }}
                  target="_blank"
                >
                  <FaYoutubeSquare size={35} />
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
}

export default UserProfile;
