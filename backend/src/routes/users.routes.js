import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/users.controller.js";


export const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
