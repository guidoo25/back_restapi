import { Router } from "express";
import { createClient ,getClients} from "../controllers/clienteController.js";

import {createEmisor} from "../controllers/emisorController.js";

import {
  createProduct,
  deleteEmployee,
  getEmployee,
  getproductos,
  updateEmployee,
  getProductosByUserId

  
} from "../controllers/employees.controller.js";
import {createOrder,getOrders,createEmpleado,} from "../controllers/ordenController.js";

const router = Router();

// GET all Employees
router.get("/producto", getproductos);

// insertar producto
router.post("/producto/new", createProduct);
//ver PRODUCTO POR USERID 
router.get("/producto/:userid", getProductosByUserId);

//emisor 
router.post("/emisor",createEmisor);


//ver las ordenes
router.get("/orden/:userid",getOrders);
//

//crear orden
router.post("/orden", createOrder);
//crear cliente
router.post("/cliente",createClient );
//ver clientes 
router.get("/cliente/:userid",getClients);



//crear empleado 
router.post("/empleado",createEmpleado );


// borrar producto
router.delete("/producto/:id", deleteEmployee);


router.patch("/producto/:id", updateEmployee);

export default router;
