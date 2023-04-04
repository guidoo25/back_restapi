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
        stock: row.stock,
        min_stock: row.min_stock,
      };
    });
    
    res.json({ producto: producto });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

//actualizar producto 
export const actualizarProducto = async (req, res) => {
  const { id, iduser } = req.params; // obtener los parámetros id e iduser de la solicitud
  const { name, image, price, category, stock, min_stock } = req.body; // obtener los datos del producto a actualizar del cuerpo de la solicitud

  try {
    // Verificar si el producto existe y pertenece al usuario antes de actualizarlo
    const [rows] = await pool.query(`SELECT * FROM productos WHERE id = ? AND iduser = ?`, [id, iduser]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Actualizar el registro del producto
    await pool.query(`UPDATE productos SET name = ?, image = ?, price = ?, category = ?, stock = ?, min_stock = ? WHERE id = ? AND iduser = ?`, [name, image, price, category, stock, min_stock, id, iduser]);

    // Obtener el producto actualizado
    const [updatedRows] = await pool.query(`SELECT * FROM productos WHERE id = ? AND iduser = ?`, [id, iduser]);

    // Enviar la respuesta con el producto actualizado
    return res.status(200).json({ producto: updatedRows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ocurrió un error al actualizar el producto" });
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
        price: parseFloat(row.price),
        category: row.category,
        id: row.id,
         stock: row.stock,
        min_stock: row.min_stock,
      }));

      res.json({ producto: producto });
    } else {
      res.status(404).json({ message: 'Productos no encontrados' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};



//NUMERO DE FACTURAS ULTIMO 
export const getUltimoNumeroFacturaById = async (req, res) => {
  try {
    const { userid } = req.params;

    const [rows] = await pool.query(`SELECT * FROM ultimonumerofactura WHERE user_id = ?`, [userid]);

    if (rows.length > 0) {
      const row = rows[0]; // Tomar solo el primer elemento
      const factura = {
        facturaUltimo: row.numero_factura,
        codigo: row.codigo_establecimiento,
        userid: row.user_id,
      };
      res.json(factura); // Enviar solo los datos de la factura
    } else {
      res.status(404).json({ message: 'Número de factura no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createUltimoNumeroFactura = async (req, res) => {
  try {
    const { numero_factura, codigo_establecimiento, user_id } = req.body;

    const [result] = await pool.query(`INSERT INTO ultimonumerofactura (numero_factura, codigo_establecimiento, user_id) VALUES (?, ?, ?)`, [numero_factura, codigo_establecimiento, user_id]);

    res.status(201).json({ id: result.insertId, numero_factura: numero_factura, codigo_establecimiento: codigo_establecimiento, user_id: user_id });
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
export const updateUltimoNumeroFactura = async (req, res) => {
  try {
    const { userid } = req.params;
    const { numero_factura, codigo_establecimiento, user_id } = req.body;

    const [result] = await pool.query(`UPDATE ultimonumerofactura SET numero_factura = ?, codigo_establecimiento = ? WHERE user_id = ?`, [numero_factura, codigo_establecimiento, user_id]);

    if (result.affectedRows > 0) {
      res.json({  numero_factura: numero_factura, codigo_establecimiento: codigo_establecimiento, user_id: user_id });
    } else {
      res.status(404).json({ message: 'Número de factura no encontrado' });
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

//actualizar Stock 

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const { iduser } = req.body;

  const [rows] = await pool.query("UPDATE productos SET stock = ? WHERE id = ? AND iduser = ?", [stock, id, iduser]);
  if (rows.length <= 0) {
    return res.status(404).json({ message: "producto no encontrado" });
  }
  const newStock = rows[0].stock + stockChange;
  if (newStock < 0) {
    return res.status(400).json({ message: "Stock insuficiente" });
  }
  await pool.query("UPDATE productos SET stock = ? WHERE id = ?", [newStock, id]);
  res.json ({ message: "Stock actualizado" , newStock : newStock});
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
