import { config } from 'dotenv'
config()
export const POSTGRES_DB = process.env.POSTGRES_DB
export const POSTGRES_PORT = process.env.POSTGRES_PORT 
export const POSTGRES_USER = process.env.POSTGRES_USER
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const EXPRESS_PORT =  process.env.EXPRESS_PORT
export const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS
export const STATE = process.env?.STATE
export const ADMINISTRATOR = process.env.ADMINISTRATOR
export const PASSWORD = process.env.PASSWORD
