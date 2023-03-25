
import { pool } from "../db.js";
export const createEmisor = async (req, res) => {
  try {
    const {
        user_id,
      plan_id,
      ruc,
      ambiente,
      tipoEmision,
      razonSocial,
      nombreComercial,
      direccionMatriz,
      contribuyenteEspecial,
      obligadoContabilidad,
      dirLogo,
      dirFirma,
      dirDocAutorizados,
      passFirma,
      servidorCorreo,
      correoRemitente,
      passCorreo,
      puerto,
      SSLHabilitado,
      activo,
      cantComprobante,
      fechaInicio,
      fechaFin,
      regimenMicroempresa,
      regimenRimpe,
      regimenRimpe1,
        resolucionAgenteRetencion,
    } = req.body;

    // Verificar que los campos requeridos no estén vacíos
    if (
      !plan_id ||
      !ruc ||
      !ambiente ||
      !tipoEmision ||
      !razonSocial ||
      !direccionMatriz ||
      !dirLogo ||
      !dirFirma ||
      !dirDocAutorizados ||
      !passFirma ||
      !servidorCorreo ||
      !correoRemitente ||
      !passCorreo ||
      !puerto ||
      !activo ||
      !cantComprobante ||
      !fechaInicio
    ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Iniciar una transacción para asegurar que todas las operaciones se completen correctamente


    // Insertar el Emisor en la tabla
    const result = await pool.query(
        'INSERT INTO emisor (user_id,plan_id, ruc, ambiente, tipoEmision, razonSocial, nombreComercial, direccionMatriz, contribuyenteEspecial, obligadoContabilidad, dirLogo, dirFirma, dirDocAutorizados, passFirma, servidorCorreo, correoRemitente, passCorreo, puerto, SSLHabilitado, activo, cantComprobante, fechaInicio, fechaFin, regimenMicroempresa, regimenRimpe, regimenRimpe1, resolucionAgenteRetencion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          user_id,
          plan_id,
          ruc,
          ambiente,
          tipoEmision,
          razonSocial,
          nombreComercial,
          direccionMatriz,
          contribuyenteEspecial,
          obligadoContabilidad,
          dirLogo,
          dirFirma,
          dirDocAutorizados,
          passFirma,
          servidorCorreo,
          correoRemitente,
          passCorreo,
          puerto,
          SSLHabilitado,
          activo,
          cantComprobante,
          fechaInicio,
          fechaFin,
          regimenMicroempresa,
          regimenRimpe,
          regimenRimpe1
        ]
      );
      

    console.log(`Emisor ${ruc} insertado correctamente`);

    // Commit de la transacción


    // Devolver la respuesta al cliente
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: `Emisor ${ruc} insertado correctamente` });
    } else {
      return res.status(500).json({ message: 'Creación fallida' });
    }
  } catch (error) {
    console.error(`Error al crear el Emisor:`, error);

 

    return res.status(500).json({ message: 'Error al crear el Emisor' });
    }
    };

