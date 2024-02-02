import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
const Vehicles = sequelize.define("vehicles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type:DataTypes.STRING,
    },
    active: {
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    },
    licence_plate: {
      type:DataTypes.STRING,
    },
    vin_sn: {
      type:DataTypes.STRING,
    },
    driver_id: {
      type:DataTypes.INTEGER,
    },
    asignament_date: {
      type:DataTypes.DATE,
    },
    model_id: {
      type:DataTypes.INTEGER,
    },
    adquisition_date: {
      type:DataTypes.DATE,
    },
    model_year: {
      type:DataTypes.DATE,
    },
    color: {
      type:DataTypes.STRING,
    },
    state_id: {
      type:DataTypes.INTEGER,
    },
    odometer_unit: {
      type:DataTypes.STRING,
    },
    transmision: {
      type:DataTypes.STRING,
    },
    fuel_type: {
      type:DataTypes.STRING,
    },
    horsepower: {
      type:DataTypes.FLOAT(10, 2),
    },
    cubicaje: {
      type:DataTypes.FLOAT(10, 2),
    },
    vehicle_type_id: {
      type:DataTypes.INTEGER,
    },
    motor_umber: {
      type:DataTypes.STRING,
    },
    serie_number: {
      type:DataTypes.STRING,
    },
    chasis_number: {
      type:DataTypes.STRING,
    },
    limitacion_propiedad: {
      type:DataTypes.STRING,
    },
    restriccion_movilidad: {
      type:DataTypes.STRING,
    },
    declaracion_importacion: {
      type:DataTypes.STRING,
    },
    licencia_transito: {
      type:DataTypes.STRING,
    },
    carga: {
      type:DataTypes.FLOAT(10, 2),
    },
    blindaje: {
      type:DataTypes.STRING,
    },
    transito: {
      type:DataTypes.STRING,
    },
    cilindrada: {
      type:DataTypes.FLOAT(10, 2),
    },
    peso: {
      type:DataTypes.FLOAT(10, 2),
    },
    largo: {
      type:DataTypes.FLOAT(10, 2),
    },
    ancho: {
      type:DataTypes.FLOAT(10, 2),
    },
    alto: {
      type:DataTypes.FLOAT(10, 2),
    },
    mtto_cada: {
      type:DataTypes.FLOAT(10, 2),
    },
    aviso_a: {
      type:DataTypes.FLOAT(10, 2),
    },
    description: {
      type:DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

export default Vehicles;
