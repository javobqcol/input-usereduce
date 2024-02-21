import { compare, encrypt } from "../helpers/handleBcrypt.js";
import Users from "../models/Users.js";
import Roles from "../models/Roles.js";
import UserToRol from "../models/UserToRol.js";
import { Op } from "sequelize";
import { sequelize } from "../database/database.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: Roles,
          attributes: ["id", "rolename", "active"],
          // through: { attributes: ["active"], where: { active: true } }, <-active in usertorol
          through: { attributes: ["active"] },
          // where: { active: true }, <-rol active
          required: false
        },
      ],
      // where: { active: true },<-user active
    });

    return res.status(200).json(users);
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
          attributes: ["id", "rolename", "active"],
//          through: { attributes: ["active"], where: { active: true } },
          through: { attributes: ["active"] },
          // where: { active: true },
          required: false
        },
      ],
//      where: { active: true },
    });
    if (!user ) {
      return res.status(404).json({ message: "user not exist" });
    }
    res.json(user);
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, roles, active, password } = req.body;
  const t = await sequelize.transaction();
  try {
    const userPass = await encrypt(password);

    const existe = await Users.findOne({ where: { email: email } });
    if (existe) {
      throw new Error("Usuario existe");
    }

    const newUser = await Users.create(
      {
        username: username,
        email: email,
        active: true,
        password: userPass,
      },
      { transaction: t }
    );
    console.log(newUser);
    await newUser.addRoles(
      roles.map((role) => role.id),
      { transaction: t }
    );
    res.json(newUser);
    await t.commit();
  } catch (error) {
    await t.rollback();
    return res.status(401).json({ error: error?.message });
  }
};

export const updateUser = async (req, res) => {
  const { username, email, active, password, roles } = req.body;
  const t = await sequelize.transaction();
  try {
    //traes el user con sus tareas
    const { id } = req.params;

    const user = await Users.findByPk(id);

    if (!user) {
      throw new Error("User problem");
    }
    

    // if (password !== updateUser.password)
    const userPass =
      password === user.password ||
      (await compare(password, user.password))
        ? user.password
        : await encrypt(password);

    user.set({
      userName: username,
      email: email,
      active: active,
      password: userPass,
    });
    console.log(username, email, password, active)

    await user.save({transaction: t});


    await user.setRoles([],{transaction: t});

    // await newUser.addRoles(
    //   roles.map((role) => role.id),
    //   { transaction: t }
    // );
    // const updatedRoles = roles.map(role => {
    //   const active = role.usertorol ? role.usertorol.active : true; // Handle potential default value
    //   return { id: role.id, through: { active,  userId:user.id, rolId:role.id } };
    // });

    for (const role of roles) {
      const active = role.usertorol ? role.usertorol.active : true; // Handle potential default value
      console.log(role.id, { through: {active, userId:user.id, rolId:role.id}})
      await user.addRoles(role.id, { through: {active, userId:user.id, rolId:role.id},transaction: t},{transaction: t});
    }
    console.log("paso2")

    res.json("Transaccion exitosa");
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
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
