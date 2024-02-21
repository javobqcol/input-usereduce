import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import Users from "./Users.js";
import Roles from "./Roles.js";

const UserToRol = sequelize.define("usertorol", {
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  }},
  {
    timestamps: true,
  }
);

Users.belongsToMany(Roles, { 
  through: UserToRol,
  foreignKey: "userId",
  sourceKey:"id" }
);

Roles.belongsToMany(Users, { 
  through: UserToRol,
  foreignKey: "rolId",
  sourceKey: "id"
 }
);

export default UserToRol;

