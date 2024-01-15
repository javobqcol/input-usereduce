import axios from "axios"
import { URL } from "../config"

export default axios.create({
  baseURL: URL
})