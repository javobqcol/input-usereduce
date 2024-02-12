export const ErrorText = ({ error }) => {
  return (
    <p
      style={{
        position: "absolute",
        right: "0",
        bottom: "-2rem",
        color: "red",
        fontSize: "10px",
      }}
    >
      {error}
    </p>
  );
};