import { pool } from "../db.js";


// Configuración de la conexión a MySQL


export const createOrder = async (req, res) => {
    try {
      const {  productos, cliente ,total ,empleado,userid} = req.body;
  
      // Verificar que los campos requeridos no estén vacíos
      if ( !productos || !cliente || !total, !empleado) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
  

  
      // Iniciar una transacción para asegurar que todas las operaciones se completen correctamente
  
      // Insertar la orden en la tabla
      await pool.query('INSERT INTO orden ( userid,productos, cliente,total,id_empleado, fecha) VALUES (?,?,?, ?,?, NOW())', [ userid,JSON.stringify(productos), cliente,total,empleado]);
  
    
      // Devolver la respuesta al cliente
      if (result.affectedRows > 0) {
        return res.status(201).json({ message: `Orden insertada correctamente` });
      } else {
        return res.status(500).json({ message: 'Creación fallida' });
      }
    } catch (error) {
      console.error(`Error al insertar la orden:`, error);

  
      return res.status(500).json({ message: 'Error al insertar la orden' });
    } finally {
      // Cerrar la conexión

    }
  };



  export const getOrders = async (req, res) => {
    try {
      const { userid } = req.params;
      const [rows] = await pool.query(`SELECT * FROM orden WHERE userid = ? `, [userid]);
      const orders = rows.map((row) => {
        return {
          id: row.id,
          cliente: row.cliente,
          total: row.total,
          order_date: row.productos,
          fecha:row.fecha,
          empleado:row.id_empleado
        };
      });
  
      // Return the response with the paginated orders
      return res.status(200).json({ orders });
    } catch (error) {
      console.error(`Error al obtener las órdenes:`, error);
  
      return res.status(500).json({ message: 'Error al obtener las órdenes' });
    }
  };
  

  export const createEmpleado = async (req, res) => {
    try {
      const { id,nombre,apellido } = req.body;
  
      // Verificar que los campos requeridos no estén vacíos
      if ( !id || !nombre || !apellido) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
  

  
      // Iniciar una transacción para asegurar que todas las operaciones se completen correctamente
  
      // Insertar la orden en la tabla
      await pool.query('INSERT INTO Empleado ( id, nombre,apellido) VALUES (?,?, ?)', [ id, nombre,apellido]);
  
      
  
      console.log(`empleado ${codigo} insertada correctamente`);
  
      // Devolver la respuesta al cliente
      if (result.affectedRows > 0) {
        return res.status(201).json({ message: `empleado ${codigo} insertada correctamente` });
      } else {
        return res.status(500).json({ message: 'Creación fallida' });
      }
    } catch (error) {
      console.error(`Error al insertar la orden:`, error);
    }
  };