import { app } from "./app.js";
import { sequelize } from "./database/database.js";
import {
  EXPRESS_PORT
} from "./config/config.js";

const main = async() =>{
  try {
    await sequelize.sync()

    app.listen(EXPRESS_PORT) 
    console.log('Server listening on port ', EXPRESS_PORT)

  } catch (error) {
    console.error('unable to connect to database')
  }
}

main()
