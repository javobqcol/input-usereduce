import { compare } from "../helpers/handleBcrypt.js";
import { generateToken } from "../helpers/generateToken.js";
import { Users } from "../models/Users.js";
import { Roles } from "../models/Roles.js";
import { handleError } from "../helpers/handleError.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!user || !password) {
      return res.status(400).json({ msg: "All fields are required" })
    }
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

    if (!user || !user.active) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }

    const chechPassword = await compare(password, user.password);
    if (!chechPassword) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }

    const accessToken = generateToken(user);

    const refreshToken = generateNewToken(user);
    res.cookie('jwt',refreshToken, {
      httpOnly:true,
      secure:true,
      sameSite:'None',
      maxAge: 7*24*60*60*1000
    })
    res
      .status(200)
      .json({
        token: accessToken
      });
  } catch (error) {
    return handleError(res, error);
  }
};
