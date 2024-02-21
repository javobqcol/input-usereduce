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

//router.get("/", requireToken, checkRoleAuth(["admin"]), getUsers);
router.get("/", requireToken, checkRoleAuth(["admin"]), getUsers);
//router.get("/",  getUsers);
router.post("/",  requireToken, checkRoleAuth(["admin"]), createUser);
router.put("/:id",  requireToken, checkRoleAuth(["admin"]), updateUser);
//router.put("/:id", requireToken, checkRoleAuth(["admin"]), updateUser);
router.delete("/:id",  requireToken, checkRoleAuth(["admin"]), deleteUser);
router.get("/:id",  requireToken, checkRoleAuth(["admin"]), getUser);

export default router