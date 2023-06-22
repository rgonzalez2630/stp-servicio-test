const {Router} = require('express');
const router = Router();

const PRUEBAS = false;

router.post('/cobranza', (req, res) => {


    var json = JSON.stringify(req.body);
    if (json == "{}") {
        res.json({"error": "Cuerpo vacío '" + json + "'."});
        return
    }

    var https = require('https');

    var url_ = 'ep-dot-si-nube.appspot.com'
    if (PRUEBAS) {
        url_ = 'ep-dot-facturanube.appspot.com';
    }

    var options = {
        hostname: url_,
        path: '/stp/cobranza/TKN_ACJP_SINUBE_2022',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(json)
        }
    };
    var postreq = https.request(options, function (res) {
        console.log("POST_RES", res.statusCode);
        console.log("POST_RES", res.statusMessage);
    });
    postreq.write(json);
    postreq.end();

    res.json({"mensaje": "confirmar"});
})

module.exports = router;


// {
//    "id": 3191365,
//     "fechaOperacion": 20200127,
//     "institucionOrdenante": 846,
//     "institucionBeneficiaria": 90646,
//     "claveRastreo": "12345",
//     "monto": 0.01,
//     "nombreOrdenante": "STP",
//     "tipoCuentaOrdenante": 40,
//     "cuentaOrdenante": "846180000400000001",
//     "rfcCurpOrdenante": "ND",
//     "nombreBeneficiario": "NOMBRE_DE_BENEFICIARIO",
//     "tipoCuentaBeneficiario": 40,
//     "cuentaBeneficiario": "64618012340000000D",
//     "nombreBeneficiario2": "NOMBRE_DE_BENEFICIARIO2",
//     "tipoCuentaBeneficiario2": 40,
//     "cuentaBeneficiario2": "64618012340000000D",
//     "rfcCurpBeneficiario": "ND",
//     "conceptoPago": "PRUEBA1",
//     "referenciaNumerica": 1234567,
//     "empresa": "NOMBRE_EMPRESA",
//     "tipoPago":1,
//     "tsLiquidacion": "1634919027297",
//     "folioCodi": "f4c1111abd2b28a00abc"
// }
