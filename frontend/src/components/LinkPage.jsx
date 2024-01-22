import React from "react";
import { Link } from "react-router-dom";
import "./LinkPage.css"
export const LinkPage = () => {
  return (
    <section className="wrapper">
      <h1>Links</h1>
      <br />
      <section className="links">
        <h2>Public</h2>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <br />
        <h2>Private</h2>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin Page</Link>
        </section>
    </section>
  );
};
