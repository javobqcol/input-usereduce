import express from 'express'
import { router as productRoutes} from './routes/products.routes.js' 
import { router as userRoutes} from './routes/users.routes.js' 
import { router as loginRoutes} from './routes/login.routes.js'
import morgan from "morgan"
import cors from 'cors'
import path from "path"
import { corsOptions } from './config/corsOptions.js'

export const app = express()

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(express.json())


app.use(cors());
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/login", loginRoutes)

