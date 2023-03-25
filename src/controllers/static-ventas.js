import { pool } from "../db.js";


// Configuración de la conexión a MySQL

export const getOrdersStats = async (req, res) => {
    try {
      const { userid } = req.params;
  
      // Get total sales for the user
      const [totalSalesRows] = await pool.query(
        'SELECT SUM(total) AS total_sales FROM orden WHERE userid = ?',
        [userid]
      );
      const { total_sales } = totalSalesRows[0];
  
      // Get number of sales for the user
      const [salesCountRows] = await pool.query(
        'SELECT COUNT(*) AS sales_count FROM orden WHERE userid = ?',
        [userid]
      );
      const { sales_count } = salesCountRows[0];
  
      // Return the response with the sales stats
      return res.status(200).json({ total_sales, sales_count });
    } catch (error) {
      console.error(`Error al obtener las estadísticas de ventas:`, error);
  
      return res.status(500).json({ message: 'Error al obtener las estadísticas de ventas' });
    }
  };
  export const getSalesByWeek = async (req, res) => {
    try {
      const { userid } = req.params;
  
      // Get sales by week for the user
      const [rows] = await pool.query(
        'SELECT DATE_FORMAT(fecha, "%x-%v") AS week, SUM(total) AS total_sales FROM orden WHERE userid = ? GROUP BY week',
        [userid]
      );
  
      // Map the rows to a more readable format
      const salesByWeek = rows.map((row) => {
        return {
          week: row.week,
          total_sales: row.total_sales,
        };
      });
  
      // Return the response with the sales stats
      return res.status(200).json({ ventasSemanas: salesByWeek });
    } catch (error) {
      console.error(`Error al obtener las estadísticas de ventas por semana:`, error);
  
      return res.status(500).json({ message: 'Error al obtener las estadísticas de ventas por semana' });
    }
  };

  export const getSalesToday = async (req, res) => {
    try {
      const { userid } = req.params;
  
      // Get total sales for the day for the user
      const [salesRows] = await pool.query(
        'SELECT SUM(total) AS total_sales FROM orden WHERE userid = ? AND fecha >= CURDATE()',
        [userid]
      );
  
      // Get the total sales value from the first row of the result set
      const totalSalesToday = salesRows[0].total_sales;
  
      // Get the number of orders for the day for the user
      const [ordersRows] = await pool.query(
        'SELECT COUNT(*) AS num_orders FROM orden WHERE userid = ? AND fecha >= CURDATE()',
        [userid]
      );
  
      // Get the number of orders value from the first row of the result set
      const numOrdersToday = ordersRows[0].num_orders;
  
      // Return the response with the total sales and number of orders for the day
      return res.status(200).json({ ventasHoy: totalSalesToday, ordenesHoy: numOrdersToday });
    } catch (error) {
      console.error(`Error al obtener las estadísticas de ventas y órdenes de hoy:`, error);
  
      return res.status(500).json({ message: 'Error al obtener las estadísticas de ventas y órdenes de hoy' });
    }
  };
  
  


  
  export const getOrdersStatsByMonth = async (req, res) => {
    try {
      const { userid } = req.params;
  
      // Get total sales by month for the user
      const [rows] = await pool.query(
        'SELECT YEAR(fecha) as year, MONTH(fecha) as month, SUM(total) as total_sales FROM orden WHERE userid = ? GROUP BY YEAR(fecha), MONTH(fecha)',
        [userid]
      );
  
      const sales_by_month = rows.map((row) => {
        return {
          month: row.month,
          year: row.year,
          total_sales: row.total_sales
        };
      });
  
      // Return the response with the sales stats by month
      return res.status(200).json({ sales_by_month });
    } catch (error) {
      console.error(`Error al obtener las estadísticas de ventas por mes:`, error);
  
      return res.status(500).json({ message: 'Error al obtener las estadísticas de ventas por mes' });
    }
  };
  
  //numero de ordenes de empelados 
  export const getOrdersStatsByEmployee = async (req, res) => {
    try {
      const { userid } = req.params;
  
      // Get orders by month and employee for the user
      const [ordersRows] = await pool.query(
        'SELECT e.nombre AS empleado, COUNT(*) AS num_ordenes, MONTH(o.fecha) AS mes FROM orden o JOIN empleado e ON o.id_empleado = e.id WHERE o.userid = ? GROUP BY e.id, mes;',
        [userid]
      );
  
      // Return the response with the orders stats
      return res.status(200).json({ orders: ordersRows });
    } catch (error) {
      console.error(`Error al obtener las estadísticas de órdenes:`, error);
  
      return res.status(500).json({ message: 'Error al obtener las estadísticas de órdenes' });
    }
  };
