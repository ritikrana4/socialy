import React from "react";
import { auth } from "../firebase";

function Dashboard() {
  return (
    <div
      onClick={() => {
        auth.signOut();
      }}
    >
      dashboard
    </div>
  );
}

export default Dashboard;
