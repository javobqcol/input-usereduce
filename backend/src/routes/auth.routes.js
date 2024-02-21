import {Router} from "express";
import { login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middleware/validatorManager.js";
import { requireToken} from "../middleware/requireToken.js";
import { requireRefreshToken } from "../middleware/requireRefreshToken.js";
import { checkRoleAuth } from "../middleware/roleAuth.js";

const router = Router();

router.post(
  "/login",
  bodyLoginValidator,
  login
);

router.post("/register",bodyRegisterValidator, register);

router.get("/refresh",requireRefreshToken, refreshToken)
router.get("/logout", logout)
export default router;
