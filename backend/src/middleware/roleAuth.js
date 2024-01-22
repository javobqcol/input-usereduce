import { JWT_SECRET_ACCESS } from "../config/config.js";
import { Roles } from "../models/roles.js";
import { Users } from "../models/users.js";
import jwt from "jsonwebtoken";

export const validateRoles = (roles) => async(req, res, next) => {

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
    const userRoles = user.roles.filter(
      (x) => x.active
    )
    if (!roles.includes(...userRoles)) {
      return res.status(403).send("No tienes permiso para acceder a esta ruta");
    }

    next();
  } catch (error) {
    return res.status(401).send("Token no válido");
  }
};