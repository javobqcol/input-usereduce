import { refreshToken } from "../controllers/auth.controller.js";
import Roles from "../models/Roles.js";
import User from "../models/Users.js";

export const checkRoleAuth = (rolList) => async (req, res, next) => {
  try {
    if (!req?.uid) {
      throw new Error("No token provided"); // no uid ... no token --> error
    }
    const response = await User.findByPk(req.uid, {
      include: [
        {
          model: Roles,
          attributes: ["rolename", "active"],
        },
      ],
    }) //aqui ya es seguro que hay un token y es valido
    const userData = response.toJSON()
    for (const rol of rolList) {
      if (userData.roles.find((r) => (r.rolename === rol && r.active))) {
        //  tienes rol pa la operacion? pasa (ahora un usuario puede tener varios role y se puede dar acceso a varios roles tambien)
        req.roles = userData.roles;
        return next();
      }
    }
    throw new Error("No autorization"); // no tienes rol pa la operacion? -->  error
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};
