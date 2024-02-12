import { Alert, AlertTitle, Box, Button, Snackbar } from "@mui/material";
import { useState } from "react";

export const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <h1>
      Home
      <Box sx={{ display: "grid", gap: "1rem" }}>
      
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error Alert.
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => setOpen(!open)}>Open</Button>
        <Snackbar
          open={open}
          autoHideDuration={1000} onClose={() => setOpen(false)}>
            <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error Alert.
        </Alert>
        </Snackbar>
      </Box>
    </h1>
  );
};
