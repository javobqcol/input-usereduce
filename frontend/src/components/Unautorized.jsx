import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="wrapper">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="input-box">
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
};
