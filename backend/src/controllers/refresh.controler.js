import { generateNewToken, generateToken } from "../helper/generateToken.js";

export const refreshToken = (req, res) => {
  const user = {
                  email : req.body.email,
                  roles : req.body.roles
                }

  const newToken = generateToken(user)
  

  res.set("Authorization", newToken);
  res.send({
    token: newToken,
  });
};

