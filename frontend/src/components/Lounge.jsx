import { Link } from "react-router-dom";

export const Lounge = () => {
  return (
    <section className="wrapper">
      <h1>The Lounge</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>
      <div className="input-box">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
