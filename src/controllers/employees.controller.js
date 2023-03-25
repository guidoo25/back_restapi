import { pool } from "../db.js";

export const getproductos = async (req, res) => {
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
    const [rows] = await pool.query(`SELECT * FROM productos LIMIT ${limit} OFFSET ${startValue}`);
    const producto = rows.map((row) => {
      return {
        name: row.name,
        image: row.image,
        price: parseInt(row.price),
        category: row.category,
        id: row.id,
      };
    });
    
    res.json({ producto: producto });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
export const getProductosByUserId = async (req, res) => {
  try {
    const { userid } = req.params;

    const [rows] = await pool.query(`SELECT * FROM productos WHERE iduser = ?`, [userid]);

    if (rows.length > 0) {
      const producto = rows.map(row => ({
        name: row.name,
        image: row.image,
        price: parseInt(row.price),
        category: row.category,
        id: row.id,
      }));

      res.json({ producto: producto });
    } else {
      res.status(404).json({ message: 'Productos no encontrados' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};








export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }




};





















export const createProduct = async (req, res) => {
  try {
    const { name, image, price, category,userid } = req.body;

    // Verificar que los campos requeridos no estén vacíos
    if (!name ||   !price || !category, !userid) {
      console.log(req.body);
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Insertar el producto en la base de datos
    const [result] = await pool.query(
      'INSERT INTO productos (name, image, price, category,iduser) VALUES (?,?,?,?,?)',
      [name, image, price, category,userid]
    );

    // Cerrar la conexión

    console.log(req.body);

    // Devolver la respuesta al cliente
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Producto creado exitosamente' });
    } else {
      return res.status(500).json({ message: 'Creación fallida' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};













export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE productos SET name = IFNULL(?, name), price = IFNULL(?, price) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
