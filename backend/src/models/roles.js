import { DataTypes } from "sequelize";
import { sequalize } from "../database/database.js";
export const Roles = sequalize.define('roles',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rolename: {
    type:DataTypes.ENUM("user", "moderator", "admin"), defaultValue: "user",  allowNull: false
  },
  active:{
    type:DataTypes.BOOLEAN, defaultValue : true,  allowNull: false
  },

}, {
  timestamps: true,
})