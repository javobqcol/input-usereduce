import React from "react";
import { Link } from "react-router-dom";
import { Users } from "./Users";

export const Admin = () => {
  return (
    <section className="wrapper">
      <h1>Admins Page</h1>
      <br />
      <Users/>
      <div >
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
