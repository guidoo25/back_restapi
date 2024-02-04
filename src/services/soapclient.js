import * as soap from 'soap';

const url = 'http://localhost:8080/MasterOffline/ProcesarComprobanteElectronico?wsdl';

const options = {
    forceSoap12Headers: true,
    disableCache: true,
    endpoint: url,
    wsdl_headers: {
        Authorization: 'Basic ' + Buffer.from('username:password').toString('base64')
    }
};

const classmap = {
    factura: 'factura',
    proforma: 'proforma',
    liquidacionCompra: 'liquidacionCompra',
    comprobanteGeneral: 'comprobanteGeneral',
    detalleFactura: 'detalleFactura',
    detalleProforma: 'detalleProforma',
    detalleLiquidacionCompra: 'detalleLiquidacionCompra',
    detalleAdicional: 'detalleAdicional',
    impuesto: 'impuesto',
    campoAdicional: 'campoAdicional',
    totalImpuesto: 'totalImpuesto',
    configAplicacion: 'configAplicacion',
    configCorreo: 'configCorreo',
    guiaRemision: 'guiaRemision',
    destinatario: 'destinatario',
    detalleGuiaRemision: 'detalleGuiaRemision',
    comprobanteRetencion: 'comprobanteRetencion',
    impuestoComprobanteRetencion: 'impuestoComprobanteRetencion',
    notaDebito: 'notaDebito',
    motivo: 'motivo',
    pagos: 'pagos',
    notaCredito: 'notaCredito',
    detalleNotaCredito: 'detalleNotaCredito',
    comprobantePendiente: 'comprobantePendiente',
    mensajeGenerado: 'mensajeGenerado',
    respuesta: 'respuesta',
    procesarComprobantePendiente: 'procesarComprobantePendiente',
    procesarComprobantePendienteResponse: 'procesarComprobantePendienteResponse',
    procesarComprobante: 'procesarComprobante',
    procesarComprobanteResponse: 'procesarComprobanteResponse',
    generarXMLPDF: 'generarXMLPDF',
    generarXMLPDFResponse: 'generarXMLPDFResponse',
    procesarXML: 'procesarXML',
    procesarXMLResponse: 'procesarXMLResponse',
    reenvioEmailParam: 'reenvioEmailParam',
    reenviarEmail: 'reenviarEmail',
    reenviarEmailResponse: 'reenviarEmailResponse'
};

soap.createClient(url, options, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

    client.classmap = classmap;

    client.procesarComprobantePendiente({}, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(result);
    });

    client.procesarComprobante({}, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(result);
    });

    client.generarXMLPDF({}, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(result);
    });

    client.procesarXML({}, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(result);
    });

    client.procesarProforma({}, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(result);
    });

    client.reenviarEmail({}, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(result);
    });
});
