import express from 'express'
//import { router as productRoutes} from './routes/products.routes.js' 
//import { router as userRoutes} from './routes/users.routes.js' 
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/users.routes.js'
import roleRoutes from './routes/roles.routes.js'
import morgan from "morgan"
import cors from 'cors'
import path from "path"
import cookieParser from "cookie-parser";

import { corsOptions } from './config/corsOptions.js'
//import { credentials } from './middleware/credentials.js'

export const app = express()

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(express.json())
app.use(cookieParser())
//app.use(credentials);
app.use(cors(corsOptions));
// app.use("/api/products", productRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/roles", roleRoutes)


