import Users from "../models/Users.js";
import Roles from "../models/Roles.js";
import UserToRol from "../models/UserToRol.js"
import { compare, encrypt } from "../helpers/handleBcrypt.js";

import {
  generateRefreshToken,
  generateToken,
} from "../helpers/tokenManager.js";
import { sequelize } from "../database/database.js";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email: email },
      include: [
        {
          model: Roles,
          attributes: ["id", "rolename", "active"],
          through: { attributes: ["active"], where: { active: true } },
//          through: { attributes: ["active"] },
          where: { active: true },
          required: false
        },
      ],
      where: { active: true },
    });
//    console.log("user", user.toJSON())
    if (!user || !user?.active || user.roles.lenght  ) {
      throw new Error("Authorization problem");
    }
    const checkPassword = await compare(password, user.password);
    console.log(checkPassword)
    if (!checkPassword) {
      throw new Error("Authorization problem");
    }
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(200).json({ id:user.id, roles:user.roles, token, expiresIn,  });
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const register = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { username, email, password } = req.body;
    const existe = await Users.findOne({ where: { email: email } });
    if (existe) {
      throw new Error("Email exist");
    }
    const roles = await Roles.findAll({
      where:{rolename:"user"}
    })
    const userPass = await encrypt(password);

    const newUser = await Users.create(
      {
        username: username,
        email: email,
        active: true,
        password: userPass,
      },
      { transaction: t }
    );

    await newUser.addRoles(
      roles.map((role) => role.id),
      { transaction: t }
    );
    const { token, expiresIn } = generateToken(newUser.id);
    generateRefreshToken(newUser.id, res);
    res.status(201).json({ token, expiresIn });
    await t.commit()
  } catch (error) {
    await t.rollback();
    return res.status(401).json({ error: error?.message });
  }
};


export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    console.log(token, expiresIn)
    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
