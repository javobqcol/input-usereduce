import { Router } from "express";
import { refreshToken } from "../controllers/refresh.controler.js";

export const router = Router();
console.clear()
router.post("/", refreshToken);