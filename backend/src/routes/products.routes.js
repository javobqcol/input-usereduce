import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import { validateUser } from "../middleware/auth.js";
import { validateRoles } from "../middleware/roleAuth.js";

export const router = Router();

router.get("/",validateUser, validateRoles(["admin"]), getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProduct);
