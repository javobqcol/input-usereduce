import { DataTypes } from "sequelize";
import { sequalize } from "../database/database.js";
export const Products = sequalize.define('products',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  price :{
    type:DataTypes.DECIMAL(10,2),
  },
}, {
  timestamps: true
})