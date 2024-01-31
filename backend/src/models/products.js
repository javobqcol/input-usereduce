import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
const Products = sequelize.define('products',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type:DataTypes.STRING,  allowNull: false
  },
  description:{
    type:DataTypes.STRING,  allowNull: false
  },
  price :{
    type:DataTypes.DECIMAL(10,2), allowNull: false
  },
}, {
  timestamps: true
})

export default Products