import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/users.controller.js";
import { requireToken } from "../middleware/requireToken.js";
import { checkRoleAuth } from "../middleware/roleAuth.js";


const router = Router();

router.get("/", requireToken, checkRoleAuth(["admin"]), getUsers);
//router.get("/",  getUsers);
router.post("/", createUser);
router.put("/:id", requireToken, checkRoleAuth(["admin"]), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

export default router