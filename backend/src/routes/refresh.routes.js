import { Router } from "express";
import { refreshToken } from "../controllers/refresh.controler.js";

export const router = Router();

router.get("/", refreshToken);