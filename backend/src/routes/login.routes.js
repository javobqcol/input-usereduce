import { Router } from "express";

import { loginUser } from "../controllers/login.controllers.js";

export const router = Router();

router.post("/", loginUser);

