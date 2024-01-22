export const handleError = (res, error) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ message: "Error de constraint" });
  } else if (
    error.name === "SequelizeDatabaseError" &&
    error.parent.code === "ECONNREFUSED"
  ) {
    return res
      .status(500)
      .json({ message: "Error de conexión a la base de datos" });
  } else {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
