import { Router } from "express";
import {
  createRol,
  deleteRol,
  getRoles,
  getRol,
  updateRol,
  onlyRoles,
} from "../controllers/roles.controller.js";
import { requireToken } from "../middleware/requireToken.js";
import { checkRoleAuth } from "../middleware/roleAuth.js";


const router = Router();

//router.get("/", requireToken, checkRoleAuth(["admin"]), getUsers);
router.get("/only", requireToken, checkRoleAuth(["admin"]), onlyRoles);
router.get("/", getRoles);
//router.get("/",  getUsers);
router.post("/", createRol);
 router.put("/:id", updateRol);
// //router.put("/:id", requireToken, checkRoleAuth(["admin"]), updateUser);
router.delete("/:id", deleteRol);
router.get("/:id", getRol);
export default router