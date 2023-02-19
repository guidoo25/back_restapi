import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

// GET all Employees
router.get("/productos", getEmployees);

// GET An Employee
router.get("/productos/:id", getEmployee);

// DELETE An Employee
router.delete("/productos/:id", deleteEmployee);

// INSERT An Employee
router.post("/productos", createEmployee);

router.patch("/productos/:id", updateEmployee);

export default router;
