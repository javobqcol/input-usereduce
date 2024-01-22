import { JWT_SECRET_ACCESS } from "../config/config.js";
import { Roles } from "../models/roles.js";
import { Users } from "../models/users.js";
import jwt from "jsonwebtoken";

export const validateUser = async (req, res, next) => {
  if (!req.headers?.authorization) {
    return res
      .status(401)
      .send("No se ha especificado el token de autenticación");
  }

  const token = req.headers.authorization.split(" ").pop();

  try {
    const payload = jwt.verify(token, JWT_SECRET_ACCESS);

    const id = payload.id;

    const response = await Users.findByPk(id, { 
      include: [{
        model: Roles,
        attributes: [ "rolename", "active"],
      }]
    })
    const user = response.toJSON();

     if (!user || !user.active) {
       return res.status(401).send("fallo acutenticacion");
     }

    next();
  } catch (error) {
    return res.status(401).send("Token no válido");
  }
};
