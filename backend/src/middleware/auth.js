
import { verifyToken } from "../helper/generateToken.js";
import { Users } from "../models/users.js";

export const checkAuth = async(req, res, next) =>{
    console.log("por aqui")
    let token = await req.headers["authorization"] //existe el encabezado de autorizacion?
    if ( ! token ){ //si  no existe token a la mierda
            res.status(409)
            res.send({error : "No token Provided"})
            return
    }
    token = token.split(' ').pop()
    const tokenData = await verifyToken(token)

    if ( tokenData === null){ //el token no pasa la prueba... a la mierda
        res.status(409)
        res.send({error : "Token invalido"})
        return
    }
    console.log("tokenData",tokenData)
    const userData = await Users.findByPk(tokenData.id)
    if ( ! userData.active ){ // si el usario esta inactivo.. a la mierda
        res.status(409)
        res.send({error : "tu por aqui no pasas"})
        return
    }
    next()  //si el token sortea el campo minado o el hacker es la monda o el token es valido
}