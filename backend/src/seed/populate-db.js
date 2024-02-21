import { ADMINISTRATOR, PASSWORD } from "../config/config.js";
import { sequelize } from "../database/database.js";
import { encrypt } from "../helpers/handleBcrypt.js";

import Users from "../models/Users.js";
import Roles from "../models/Roles.js";
import UserToRol from "../models/UserToRol.js";

import Vehicles from "../models/vehicles.js";

const ROLES = [
  { rolename: "user", active: true },
  { rolename: "moderator", active: true },
  { rolename: "admin", active: true },
  { rolename: "printer", active: true },
];
const populateDatabase = async () => {
  await sequelize
    .sync({ force: true })
    .then(async () => {
      const userPass = await encrypt(PASSWORD);
      const user = await Users.create({
        username: ADMINISTRATOR,
        email: ADMINISTRATOR,
        password: userPass, // Reemplaza con una contraseña segura
        active: true,
      });

      const roles = await Roles.bulkCreate(ROLES);

      for (const role of roles) {
        await UserToRol.create({
          userId: user.id,
          rolId: role.id,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Llama a la función para poblar la base de datos
populateDatabase();
