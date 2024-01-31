import { generateNewToken, generateToken } from "../helper/generateToken.js";

export const refreshToken = (req, res) => {
  const cookies = reg.cookies
 

  if (!cookies?.jwt) return res.status(401).json({msg: "Unauthorized"})

  const refreshToken = cookies.jwt
  jwt.verify
  const newToken = generateToken(user)
  
  res.set("Authorization", newToken);
  res.send({
    token: newToken,
  });
};

