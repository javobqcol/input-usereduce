import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Roles = sequelize.define('roles',{
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