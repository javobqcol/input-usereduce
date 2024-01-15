import { compare } from "../helper/handleBcrypt.js";
import { tokenSign } from "../helper/generateToken.js";
import { Users } from "../models/users.js";
import { handleError } from "../helper/handleError.js";


export const loginUser = async (req, res) => {
  console.log("aqui")
  try {
    const { email, password } = req.body;
    console.log(email, " ",password)
    const user = await Users.findOne({where: {email:email }})
    if (!user) {
      res.status(404);
      res.json({ msg: "User not found" });
      return;
    }
    if (!user.active) {
      res.status(404);
      res.json({ msg: "User not active" });
      return;
    }
    const chechPassword = await compare(password, user.password);
    const tokenSession = await tokenSign(user);
    if (!chechPassword) {
      res.status(409);
      res.json({ msg: "Invalid password" });
      return;
    }
    res.json({
      role:user.role,
      tokenSession,
    });
  } catch (error) {
    handleError(req, res, error);
  }
};
