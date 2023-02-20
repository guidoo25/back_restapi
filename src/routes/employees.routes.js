import { Router } from "express";
import {
  createProduct,
  deleteEmployee,
  getEmployee,
  getproductos,
  updateEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

// GET all Employees
router.get("/producto", getproductos);

// GET An Employee
router.get("/producto/:id", getEmployee);


// DELETE An Employee
router.delete("/producto/:id", deleteEmployee);

// INSERT An Employee
router.post("/producto/new", createProduct);

router.patch("/producto/:id", updateEmployee);

export default router;
