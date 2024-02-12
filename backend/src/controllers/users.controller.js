import Users from "../models/Users.js";
import { compare, encrypt } from "../helpers/handleBcrypt.js";
import Roles from "../models/Roles.js";




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
    return res.status(200).json( users );
  } catch (error) {
    return res.status(401).json({ error: error?.message });
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
    return res.status(401).json({ error: error?.message });
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
        active: true,
        password: userPass,
        roles: roles,
      },
      { include: "roles" }
    );

    res.json(newUser);
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const updateUser = async (req, res) => {
  const { username, email, active, password } = req.body;

  try {
    //traes el user con sus tareas
    const { id } = req.params;

    const response = await Users.findByPk(id, {
      include: [
        {
          model: Roles,
          attributes: ["id", "rolename", "active"],
        },
      ],
    });

    if (!response) {
      return res.status(404).json({ message: "user not exist" });
    }
    const updateUser = response.toJSON()
   
   // if (password !== updateUser.password)
    const userPass = (password === updateUser.password) || await compare(password, updateUser.password)
                ? updateUser.password
                : await encrypt(password);

    response.set({
      userName: username,
      email: email,
      active: active,
      password: userPass,
    });
    const rolesIniciales = [...updateUser.roles];
    const userId = id
    req.body?.roles?.map(async (rol) => {
      try {
        const [upsetRol, created] = await Roles.upsert({ //postgres and sqllite alwais create is null
          id: rol?.id,
          rolename: rol.rolename,
          active: rol.active,
          userId: userId,
        });
      } catch (error) {
        return res.status(401).json({ error: error?.message });
      }
    });
    rolesIniciales.map(async (rol) => {
      try {
        if (!req.body?.roles?.find((row) => row.id === rol.id)) {
          await Roles.destroy({
            where: {
              id: rol.id,
            },
          });
        }
      } catch (error) {
        return res.status(401).json({ error: error?.message });
      }
    });
    await response.save();
    res.json(updateUser);
  } catch (error) {
    return res.status(401).json({ error: error?.message });
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
    return res.status(401).json({ error: error?.message });
  }
};
