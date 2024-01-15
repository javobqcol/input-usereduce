import { DataTypes } from "sequelize";
import { sequalize } from "../database/database.js";
export const Users = sequalize.define('users',{
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
  role: {
    type:DataTypes.ENUM("user", "moderator", "administrator"), defaultValue: "user",  allowNull: false
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