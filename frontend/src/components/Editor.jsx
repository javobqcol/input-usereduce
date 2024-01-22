import React from "react";
import { Link } from "react-router-dom";

export const Editor = () => {
  return (
    <section className="wrapper">
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
