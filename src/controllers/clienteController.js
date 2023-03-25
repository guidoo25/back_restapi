import { pool } from "../db.js";

export const createClient = async (req, res) => {
    try {
      const { rucliente, razonSocialComprador, direccionComprador, correo, userid } = req.body;
  
      // Verificar que los campos requeridos no estén vacíos
 
      // Insertar el cliente en la base de datos
      const [result] = await pool.query(
        'INSERT INTO cliente (rucliente, razonSocialComprador, direccionComprador, correo, userid) VALUES (?, ?, ?, ?, ?)',
        [rucliente, razonSocialComprador, direccionComprador, correo, userid]
      );
  
      // Devolver la respuesta al cliente
      if (result.affectedRows > 0) {
        return res.status(201).json({ message: 'Cliente creado exitosamente' });
      } else {
        return res.status(500).json({ message: 'Creación fallida' });
      }
    } catch (error) {
      console.error(`Error al insertar el cliente:`, error);
      return res.status(500).json({ message: 'Error al insertar el cliente' });
    }
  };

  export const getClients = async (req, res) => {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;
    let startValue;
    let endValue;
    if (page > 0) {
      startValue = (page * limit) - limit;
      endValue = page * limit;
    } else {
      startValue = 0;
      endValue = 10;
    } 
  
    try {
      const { userid } = req.params; // Obtener el valor de userid desde la URL
      
      // Obtener los clientes desde la base de datos con paginado
      const [rows] = await pool.query(`SELECT * FROM cliente WHERE userid = ? LIMIT ?, ?`, [userid, startValue, limit]);
      const clientes = rows.map((row) => {
        return {
          id: row.id,
          ruc: row.rucliente,
          razonSocialComprador: row.razonSocialComprador,
          dirreccionCliente: row.direccionComprador,
          correo: row.correo,
        };
      });
  
      // Obtener la cantidad total de clientes
      const [totalCount] = await pool.query(`SELECT COUNT(*) as totalCount FROM cliente WHERE userid = ?`, [userid]);
      const totalClientes = totalCount[0].totalCount;
  
      // Devolver la respuesta al cliente
      return res.status(200).json({ clientes, totalClientes });
    } catch (error) {
      console.error(`Error al obtener los clientes:`, error);
  
      return res.status(500).json({ message: 'Error al obtener los clientes' });
    }
  };
  
  