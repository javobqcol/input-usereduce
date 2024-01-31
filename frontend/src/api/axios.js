import axios from "axios"
import { URL } from "../config"

export default axios.create({
  baseURL: URL
})

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});