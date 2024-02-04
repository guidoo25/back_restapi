import { Router } from "express";
import { createClient ,getClients} from "../controllers/clienteController.js";

import {createEmisor} from "../controllers/emisorController.js";

import {
  createProduct,
  deleteEmployee,
  actualizarProducto,
  getproductos,
  updateEmployee,
  getProductosByUserId,
  updateStocks,
  createVenta,
  checkStock,
  
} from "../controllers/employees.controller.js";
import {createOrder,getOrders,createEmpleado,} from "../controllers/ordenController.js";

const router = Router();

// GET all Employees
router.get("/producto", getproductos);

// insertar producto
router.post("/producto/new", createProduct);
//ver PRODUCTO POR USERID 
router.get("/producto/:userid", getProductosByUserId);
//update producto
router.put("/productos/:id/:iduser", actualizarProducto);

//sale create
router.post("/venta",createVenta); 

//emisor 
router.post("/emisor",createEmisor);
//update  stock 
router.put("/stock/:id", updateStocks);


//ver las ordenes
router.get("/orden/:userid",getOrders);
//

//crear orden
router.post("/orden", createOrder);
//crear cliente
router.post("/cliente",createClient );
//ver clientes 
router.get("/cliente/:userid",getClients);

//checkStock
router.get('/checkStock/:id/:quantity', checkStock)

//crear empleado 
router.post("/empleado",createEmpleado );


// borrar producto
router.delete("/producto/:id", deleteEmployee);


router.patch("/producto/:id", updateEmployee);

export default router;
