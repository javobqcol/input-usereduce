import { ADMINISTRATOR, PASSWORD } from "../config/config.js";
import { sequelize } from "../database/database.js";
import { encrypt } from "../helpers/handleBcrypt.js";
import Roles from "../models/Roles.js";
import Users from "../models/Users.js";
import Vehicles from "../models/vehicles.js"

const populateDatabase = async () => {
  await sequelize
    .sync({ force: true })
    .then(async () => {
      const userPass = await encrypt(PASSWORD);

      const response = await Users.create({
        username: ADMINISTRATOR,
        email: ADMINISTRATOR,
        password: userPass, // Reemplaza con una contraseña segura
        active: true,
      });
      const user = response.toJSON();

      await Roles.bulkCreate([
        { rolename: "admin", active: true, userId:user.id},
        { rolename: "user", active: true , userId:user.id},
        { rolename: "moderator", active: true,userId:user.id },
      ]);
    })
    .catch((error) => {
      console.log("pass");
    });
};

// Llama a la función para poblar la base de datos
populateDatabase();
