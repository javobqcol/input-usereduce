import Users from "../models/Users.js";
import Roles from "../models/Roles.js";
import { compare, encrypt } from "../helpers/handleBcrypt.js";

import {
  generateRefreshToken,
  generateToken,
} from "../helpers/tokenManager.js";

export const login = async (req, res) => {
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

    if (!user || !user?.active) {
      throw new Error("Authorization problem");
    }
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      throw new Error("Authorization problem");
    }

    if (!user || !user?.active || !checkPassword) {
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
  try {
    const { username, email, password, roles } = req.body;
    console.log("req.body", req.body)
    const existe = await Users.findOne({ where: { email: email } });
    if (existe) {
      throw new Error("Registered user ");
    }

    const response = await Users.create(
      {
        username: username,
        email: email,
        active: true,
        password: await encrypt(password),
        roles: roles,
      },
      { include: "roles" }
    );
    const newUser = response.toJSON();

    const { token, expiresIn } = generateToken(newUser.id);
    generateRefreshToken(newUser.id, res);
    res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log()
    return res.status(401).json({ error: error?.message });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await Users.findAll({
      include: [
        {
          model: Roles,
          attributes: ["id", "rolename", "active", "userId"],
        },
      ]
    });

    return res.status(200).json( user );
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);

    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
