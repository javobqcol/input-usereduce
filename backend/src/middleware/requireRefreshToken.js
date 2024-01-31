import jwt from "jsonwebtoken"

export const requireRefreshToken = (req, res, next) => {
  try {
    if (!req?.cookies || !req?.cookies?.refreshToken) {
      throw new Error("No token provided");
    }
    const refreshTokenCookie = req.cookies.refreshToken
    const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

    if (!uid){
      throw new Error("token error");
    }
    req.uid = uid
    next();
  } catch (error) {
    return res.status(401).json({ error:error?.message });
  }
};