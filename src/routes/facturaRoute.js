import {getUltimoNumeroFacturaById,updateUltimoNumeroFactura} from '../controllers/employees.controller.js';
import { Router } from 'express';
const router = Router();
router.get('/factura/:userid', getUltimoNumeroFacturaById);
router.put ('/factura/:userid', updateUltimoNumeroFactura);


export default router;
