import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expiresIn = 60 * 15;
  try {
    const token= jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return {token, expiresIn}
  } catch (error) {
    return {token:null, expiresIn:null}
  }
};

export const generateRefreshToken = (uid, res) => {
  try {
    const expiresIn = 60 * 60 * 24 * 30;
    const refreshToken = jwt.sign(
      {
        uid: uid,
      },
      process.env.JWT_REFRESH,
      {
        expiresIn,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + expiresIn * 1000)
    });
  } catch (error) {
    return {token:null, expiresIn:null}
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};
