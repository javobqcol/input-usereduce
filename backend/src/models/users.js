import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Roles } from "./roles.js";
export const Users = sequelize.define('users',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type:DataTypes.STRING,  allowNull: false
  },
  email:{
    type:DataTypes.STRING,  allowNull: false
  },

  active:{
    type:DataTypes.BOOLEAN, defaultValue : true,  allowNull: false
  },
  password :{
    type:DataTypes.STRING,  allowNull: false
  }
}, {
  timestamps: true,
  indexes: [{ unique: true, fields: ['email'] }]
})
Users.hasMany(Roles, {
  foreignKey: 'userId',
  sourceKey: 'id'
})
Roles.belongsTo(Users)