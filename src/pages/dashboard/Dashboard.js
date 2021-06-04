import React, { useContext, useState } from "react";
import { UsersContext } from "../../providers/UsersProvider";
import Headers from "../../components/Header";
import "./dashboard.css";
import { updateBio } from "../../firebase";

function Dashboard() {
  const { user } = useContext(UsersContext);
  const [values, setValues] = useState({
    Name: "",
    Tag: "",
    Bio: "",
  });
  const handleChange = (event) => {
    //do something when input something
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateBio(
      user.uid,
      values.Name.toString(),
      values.Tag.toString(),
      values.Bio.toString()
    );
  };

  return (
    <div>
      <Headers />
      <div className="maincontainer-dash">
        <div>
          <form onSubmit={handleSubmit} className="formelements">
            <input
              className="input_field"
              type="text"
              name="Name"
              value={values.Name}
              placeholder="Name"
              onChange={handleChange}
              maxLength="30"
            ></input>
            <input
              className="input_field"
              type="text"
              name="Tag"
              value={values.Tag}
              placeholder="Tag"
              onChange={handleChange}
              maxLength="30"
            ></input>
            <input
              className="input_field"
              type="text"
              name="Bio"
              value={values.Bio}
              placeholder="Bio"
              maxLength="150"
              onChange={handleChange}
            ></input>
            <input type="submit" value="Save" className="submit_button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
