import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const Roles = sequelize.define(
  "roles",
  {
    rolename: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);


export default Roles;
