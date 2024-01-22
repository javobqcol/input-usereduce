import jwt from "jsonwebtoken";
import { JWT_SECRET_ACCESS } from "../config/config.js";

//creacion de token

export const generateToken = (user) => {
  const payload = {
   id:user.id,
  };
  const token = jwt.sign(payload, JWT_SECRET_ACCESS, {
    expiresIn: "1h",
  });
  return token;
};


// Actualizacion de token
export const generateNewToken = (user) => {
  const payload = {
    id:user.id,
  };
  const token = jwt.sign(payload, JWT_SECRET_ACCESS, {
    expiresIn: "10m",
  });
  return token;
};