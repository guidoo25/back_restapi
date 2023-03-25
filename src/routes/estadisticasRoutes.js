import  {Router}  from  "express";
import { getOrdersStats ,getOrdersStatsByMonth,getSalesByWeek,
getOrdersStatsByEmployee,getSalesToday
} from "../controllers/static-ventas.js";

const router =  Router();


//consultar por dia 
router.get("/estadisticas/:userid",getSalesToday); ;
//consulta por semana 
router.get("/estadisticas/semana/:userid",getSalesByWeek); ;

//consulta por mes
router.get ("/estadisticas/mes/:userid",getOrdersStatsByMonth);

router.get ("/estadisticas/empleados/:userid",getOrdersStatsByEmployee);

export default router;
