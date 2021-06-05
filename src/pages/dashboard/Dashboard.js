import React, { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../providers/UsersProvider";
import Headers from "../../components/Header";
import "./dashboard.css";
import { firestore, updateBio } from "../../firebase";

function Dashboard() {
  const { user } = useContext(UsersContext);
  const [values, setValues] = useState({
    Name: "",
    Tag: "",
    Bio: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });
  const [loadings, setLoading] = useState(false);

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  const getDataFromFirebase = async () => {
    try {
      const snapshot = await firestore.doc(`usersdata/${user.uid}`).get();
      const {
        Name,
        Bio,
        Tag,
        twitter,
        facebook,
        instagram,
        linkedin,
        youtube,
      } = snapshot.data();
      setValues({
        Name,
        Bio,
        Tag,
        twitter,
        facebook,
        instagram,
        linkedin,
        youtube,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    //do something when input something
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    updateBio(
      user.uid,
      values.Name.toString(),
      values.Tag.toString(),
      values.Bio.toString(),
      values.twitter.toString(),
      values.facebook.toString(),
      values.instagram.toString(),
      values.linkedin.toString(),
      values.youtube.toString()
    );
    setLoading(false);
    alert("saved");
  };

  return (
    <div>
      <Headers />

      <div className="edit-profile">Edit Profile &gt;</div>
      <div className="maincontainer-dash">
        <div>
          <form onSubmit={handleSubmit} className="forms">
            <div className="formelements">
              <label>Name</label>
              <input
                className="input_field"
                type="text"
                name="Name"
                value={values.Name}
                placeholder="Name"
                onChange={handleChange}
                maxLength="30"
                required
              ></input>
              <label>Headline</label>
              <input
                className="input_field"
                type="text"
                name="Tag"
                value={values.Tag}
                placeholder="Tag"
                onChange={handleChange}
                maxLength="30"
                required
              ></input>
              <label>Biography</label>
              <textarea
                className="input_field biography"
                type="text"
                name="Bio"
                value={values.Bio}
                placeholder="Bio"
                maxLength="150"
                onChange={handleChange}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                maxLength="400"
                required
              ></textarea>
            </div>
            <div className="formelements">
              <label>www.twitter.com/username</label>
              <input
                className="input_field"
                type="text"
                name="twitter"
                value={values.twitter}
                placeholder="Enter Only Username"
                onChange={handleChange}
                maxLength="30"
              ></input>
              <label>www.facebook.com/username</label>
              <input
                className="input_field"
                type="text"
                name="facebook"
                value={values.facebook}
                placeholder="Enter Only Username"
                onChange={handleChange}
                maxLength="30"
              ></input>
              <label>www.instagram.com/username</label>
              <input
                className="input_field"
                type="text"
                name="instagram"
                value={values.instagram}
                placeholder="Enter Only Username"
                onChange={handleChange}
                maxLength="30"
              ></input>
              <label>www.linkedin.com/username</label>
              <input
                className="input_field"
                type="text"
                name="linkedin"
                value={values.linkedin}
                placeholder="Enter Only Username"
                onChange={handleChange}
                maxLength="30"
              ></input>
              <label>www.youtube.com/username</label>
              <input
                className="input_field"
                type="text"
                name="youtube"
                value={values.youtube}
                placeholder="Enter Only Username"
                onChange={handleChange}
                maxLength="30"
              ></input>
              <input
                type="submit"
                value={loadings ? "Loading..." : "Save"}
                className="submit_button"
                // eslint-disable-next-line react/jsx-no-duplicate-props
                className={loadings ? "button_loading" : "submit_button"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
