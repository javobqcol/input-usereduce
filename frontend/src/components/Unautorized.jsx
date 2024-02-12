import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container maxWidth="sm">
      <Typography
        component="p"
        variant="h3"
        sx={{ marginBottom: 3 }}
        align="center"
        color="error"
      >
        Unauthorized
      </Typography>
      <Typography component="p" variant="h5" sx={{marginBottom:3}}align="left">
        You do not have access to the requested page.
      </Typography>
      <Button variant="contained" onClick={goBack}>
        Go Back
      </Button>
    </Container>
  );
};
