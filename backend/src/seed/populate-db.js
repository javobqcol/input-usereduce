import { ADMINISTRATOR, PASSWORD } from "../config/config.js";
import { sequelize } from "../database/database.js";
import { encrypt } from "../helpers/handleBcrypt.js";
import RolNames from "../models/RolNames.js";
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

      await RolNames.bulkCreate([
        { rolname: "admin"},
        { rolname: "user"},
        { rolname: "moderator"},
        { rolname: "printer"}
      ]);
  
      await Roles.bulkCreate([
        { rolnameId: 1, active: true, userId:user.id },
        { rolnameId: 2, active: true, userId:user.id },
        { rolnameId: 3, active: true, userId:user.id },
        { rolnameId: 4, active: true, userId:user.id }
      ]);
    })
    .catch((error) => {
      console.log("pass");
    });
};

// Llama a la función para poblar la base de datos
populateDatabase();
