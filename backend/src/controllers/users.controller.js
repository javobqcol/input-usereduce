import { Users } from "../models/users.js";
import { compare, encrypt } from "../helper/handleBcrypt.js";

import { Roles } from "../models/roles.js";
import { handleError } from "../helper/handleError.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: Roles,
          attributes: ["id", "rolename", "active", "userId"],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id, {
      include: [
        {
          model: Roles,
          attributes: ["id", "rolename", "active", "userId"],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "user not exist" });
    }
    res.json(user);
  } catch (error) {
    return handleError(res, error);
  }
};

export const createUser = async (req, res) => {
  const { username, email, roles, active, password } = req.body;

  try {
    const userPass = await encrypt(password);

    const newUser = await Users.create(
      {
        username: username,
        email: email,
        active: active ? active : true,
        password: userPass,
        roles: roles,
      },
      { include: "roles" }
    );

    res.json(newUser);
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateUser = async (req, res) => {
  const { username, email, active, password } = req.body;

  try {
    //traes el user con sus tareas
    const { id } = req.params;

    const updateUser = await Users.findByPk(id, {
      include: [
        {
          model: Roles,
          attributes: ["id", "rolename", "active"],
        },
      ],
    });
    console.clear()

    if (!updateUser) {
      return res.status(404).json({ message: "user not exist" });
    }
    if (!updateUser?.active) {
      return res
        .status(401)
        .json({ message: "user inactive or not autorized" });
    }

    const checkPassword = await compare(password, updateUser.password);

    const userPass = checkPassword
      ? updateUser.password
      : await encrypt(password);
    updateUser.set({
      userName: username,
      email: email,
      active: active,
      password: userPass,
    });

    req.body?.roles.map(async (rol) => {
      if (!rol?.id) {
        try {
          const newRol = await Roles.create({
            rolename: rol.rolename,
            active: true,
            userId: id,
          });
        } catch (error) {
          return handleError(res, error);
        }
      } else {

        try {
          const updateRol = await Roles.findByPk(rol.id);
          updateRol.set(rol);
          await updateRol.save();
        } catch (error) {
          return handleError(res, error);
        }
      }
      // finalemte se debe comprar las tareas pasadas por el backend
      // se sacan  las tareas que tiene inicialmente el proyecto
      // se compraran con las tareas suministradas por el backend
      //se borran las tareas que esten en proyecto y que no suministre el backend

      const ids = updateUser._previousDataValues?.roles.map(
        (rol) => rol?.dataValues.id
      );

      ids.map(async (id) => {
        try {
          if (!req.body?.roles.map((rol) => rol.id).includes(id)) {
            await Roles.destroy({
              where: {
                id,
              },
            });
          }
        } catch (error) {
          return handleError(res, error);
        }
      });
    });
    await updateUser.save();
    res.json(updateUser);
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await Users.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return handleError(res, error);
  }
};
