import { request } from "express";
import { Users } from "../models/users.js";
import { compare, encrypt } from "../helper/handleBcrypt.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "user not exist" });
    }
    res.json(user);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, role, active, password } = req.body;
  try {
    console.log(req.body)
    const userPass = await encrypt(password)

    const newUser = await Users.create(
      {
        username:username,
        email:email,
        role:role,
        active:active,
        password:userPass
      }
    );
    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { username, email, role, active, password } = req.body;
  try {
    //traes el usero con sus tareas
    const { id } = req.params;

    const updateUser = await Users.findByPk(id);
    if (!updateUser){
      return res.status(404).json({ message: "user not exist" });
    }

    const checkPassword = await compare(password, updateUser.password);
    console.log(checkPassword)
    const userPass = checkPassword 
            ? updateUser.password
            : await encrypt(password)
    updateUser.set({
      userName: username,
      email:    email,
      role:     role,
      active:   active,
      password: userPass
    });
    await updateUser.save();
    res.json(updateUser); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(500).json({ message: error.message });
  }
};
