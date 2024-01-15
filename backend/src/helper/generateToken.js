import jwt from "jsonwebtoken";

export const tokenSign = async (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

export const verifyToken= async (token) => {
  console.log(process.env.JWT_SECRET, ' Token:', token)
  try {
    console.log("jwt.verify(token, process.env.JWT_SECRET)",jwt.verify(token, process.env.JWT_SECRET))
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
