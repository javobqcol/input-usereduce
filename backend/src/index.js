import { app } from "./app.js";
import { sequalize } from "./database/database.js";
import {
  EXPRESS_PORT
} from "./config/config.js";
import { Users } from "./models/users.js";

const main = async() =>{
  try {
    await sequalize.sync()
    await Users.seed();
    app.listen(EXPRESS_PORT)
    console.log('Server listenisn on port ', EXPRESS_PORT)

  } catch (error) {
    console.error('unable to connect to database')
  }
}

main()
