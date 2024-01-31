
import jwt from "jsonwebtoken"



export const requireToken = (req, res, next) => {
  try {
    if (!req?.headers || !req?.headers?.authorization) {
      throw new Error("No token provided");
    }
    const token = req.headers.authorization.split(" ").pop()

    const {uid} = jwt.verify(token, process.env.JWT_SECRET);

    if (!uid){
      throw new Error("token error");
    }
    req.uid= uid
    next();
  } catch (error) {

    return res.status(401).json({ error:error?.message });
  }
};
