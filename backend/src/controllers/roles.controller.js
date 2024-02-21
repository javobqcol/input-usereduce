import Roles from "../models/Roles.js";
import UserToRol from "../models/UserToRol.js";
import { Op } from "sequelize";
import { sequelize } from "../database/database.js";
import Users from "../models/Users.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll({
      include: [
        {
          model: Users,
          attributes: ["id", "username", "email", "active"],
          // through: { attributes: ["active"], where: { active: true } }, <-active in usertorol
          through: { attributes: ["active"] },
          // where: { active: true }, <-user active
          required: false
        },
      ],
      // where: { active: true },<-rol active
    });

    return res.status(200).json(roles);
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const getRol = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Roles.findByPk(id, {
      include: [
        {
          model: Users,
          attributes: ["id", "username", "email", "active"],
          // through: { attributes: ["active"], where: { active: true } }, <-active in usertorol
          through: { attributes: ["active", ] },
          // where: { active: true }, <-user active
          required: false
        },
      ],
      // where: { active: true },<-rol active
    });
    if (!role) {
      return res.status(404).json({ message: "Rol not exist" });
    }
    res.status(200).json(role);
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const createRol = async (req, res) => {
  const { rolename } = req.body;
  try {


    const newRol = await Roles.create(
      {
        rolename: rolename,
        active: true,
      }
    );
    res.status(200).json(newRol);
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};


export const deleteRol = async (req, res) => {
  const { id } = req.params;
  try {
    await Roles.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const updateRol = async (req, res) => {
  const { rolename, active, users } = req.body;
  const t = await sequelize.transaction();
  try {
    //traes el user con sus tareas
    const { id } = req.params;

    const role = await Roles.findByPk(id);

    if (!role ) {
      throw new Error("Role problem");
    }
    



    role.set({
      rolename:rolename, 
      active:active
    });

    await role.save({transaction: t});

    await role.setUsers([],{transaction: t});

    // await newUser.addRoles(
    //   roles.map((role) => role.id),
    //   { transaction: t }
    // );
    // const updatedRoles = roles.map(role => {
    //   const active = role.usertorol ? role.usertorol.active : true; // Handle potential default value
    //   return { id: role.id, through: { active,  userId:user.id, rolId:role.id } };
    // });

    for (const user of users) {
      const active = user.usertorol ? user.usertorol.active : true; // Handle potential default value
      await role.addUsers(user.id, { through: {active, userId:user.id, rolId:role.id},transaction: t},{transaction: t});
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

export const onlyRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();

    return res.status(200).json(roles);
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};