import { DataTypes } from "sequelize";
import { sequalize } from "../database/database.js";
import { Roles } from "./roles.js";
import { ADMINISTRATOR, PASSWORD } from "../config/config.js";
import { encrypt } from "../helper/handleBcrypt.js";
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

Users.seed = async () => {
  try {
    const response = await Users.findOne({
      where: { username: ADMINISTRATOR },
    });
    if (!response){
    const userPass = await encrypt(PASSWORD);
    await Users.create({
      username: ADMINISTRATOR,
      email: ADMINISTRATOR,
      password: userPass, // Reemplaza con una contraseña segura
      active: true,
      "roles": [ { "rolename": "user", "active": true } ],
    },
      { include: "roles" }
    );

    console.log("Administrator created");

  }
    console.log("administrator ok");
  } catch (error) {
    console.error("db-error:", error);
  }
};