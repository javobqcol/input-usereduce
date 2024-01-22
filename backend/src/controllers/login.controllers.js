import { compare } from "../helper/handleBcrypt.js";
import { generateToken } from "../helper/generateToken.js";
import { Users } from "../models/users.js";
import { Roles } from "../models/roles.js";
import { handleError } from "../helper/handleError.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await Users.findOne({
      where: { email: email },
      include: [
        {
          model: Roles,
          attributes: ["rolename", "active"],
        },
      ],
    });
    const user = response.toJSON();
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    if (!user.active) {
      res.status(423).json({ msg: "User not active" });
      return;
    }

    const chechPassword = await compare(password, user.password);
    if (!chechPassword) {
      res.status(409).json({ msg: "Invalid password" });
      return;
    }

    const tokenSession = generateToken(user);

    res
      .status(200)
      .json({
        token: tokenSession,
        username: user.name,
        email: user.email,
        roles: user.roles,
      });
  } catch (error) {
    return handleError(res, error);
  }
};
