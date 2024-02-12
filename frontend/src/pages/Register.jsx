import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";

const initialStateError = {
  error:false,
  message:"Ingrese un email valido"
}
export const Register = () => {
  const [email, setEmail] = useState("") 
  const [error, setError] = useState(initialStateError)

  const validateEmail = (email) => {
    const REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    console.log(REGEXP.test(email))
    return REGEXP.test(email)
  }
  const handleSubmit =(e) =>{
    e.preventDefault()
    console.log("submit")

    if (!validateEmail(email)){
      return setError({
        error:true,
        message:"Formato de Email incorrecto"
      })
    }    
    setError(
      initialStateError
    )
    
  }
  return (
    <>
      <h1>Register</h1>
      
      <Box component="form" onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <TextField
          id="email"
          label="Email"
          type="email"
          varian="outlined"
          required
          fullWidth
          helperText={error.message}
          error={error.error}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
          type="submit"
          variant="outlined"
          sx={{ mt: 2 }}>
          Submit
        </Button>
      </Container>
      </Box>
    </>
  );
};
