import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/context";

export const Home = () => {
    const { setAuth } = useContext(authContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }
  return (
    <section className="wrapper">
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <br/>
      <button onClick={logout}>Sign Out</button>
    </section>
  );
};
