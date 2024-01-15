import { verifyToken } from "../helper/generateToken.js";
import { Users } from "../models/users.js";

export const checkRoleAuth = (roles) => async (req, res, next) => {
  let token = await req.headers["authorization"];
  if (!token) {
    //si  no existe token a la mierda
    res.status(409);
    res.send({ error: "tu por aqui no pasas" });
    return;
  }
  token = token.split(" ").pop();
  const tokenData = await verifyToken(token);
  if (tokenData === null) {
    //el token no pasa la prueba... a la mierda
    res.status(409);
    res.send({ error: "tu por aqui no pasas" });
    return;
  }
  const userData = await Users.findByPk(tokenData.id); //aqui ya es seguro que hay un token y es valido
  if (![].concat(roles).includes(userData.role)) {
    // no tienes rol pa la operacion? a la mierda
    res.status(409);
    res.send({ error: "no tienes permiso" });
    return;
  }
  next(); // atravesaste el campo minado o eres la monda o el token es valido
};
