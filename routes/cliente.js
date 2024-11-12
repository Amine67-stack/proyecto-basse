const express = require("express");
const router = express.Router();

const clienteService = require("../services/clienteService");

// ■■■■■■■1- Obtener una lista de todos los clientes
router.get("/", async function (req, res) {
    console.log("GET TODOS CLIENTES");
    try {
        const clientes = await clienteService.getMultiple();
        res.status(200).json(clientes);
    } catch (err) {
        console.error("Error intentando extraer los datos de clientes ", err.message);
        res.status(500).json({ error: "Error interno al obtener los clientes" });
    }
});

// ■■■■■■■2- Obtener un cliente concreto enviando su ID
router.get("/buscar/:id", async function (req, res) {
    console.log("GET CLIENTE POR ID");
    const id = req.params.id;
    try {
        const result = await clienteService.getOneCliente(id);

        if(result.length > 0){
            res.status(200).json(result);
        } else {
            res.sendStatus(404);
        }
    } catch(err) {
        console.error("Error intentando extraer los datos del cliente: ", err.message);
        res.status(500).json({ error: "Error interno al obtener el cliente" });
    }
});

// ■■■■■■■3- Crear un cliente nuevo. Los datos del cliente se envían en un JSON
router.post("/crear", async function (req, res) {
    console.log("POST CREAR CLIENTE");
    const { nombre, apellido1, apellido2, ciudad, categoria } = req.body;

    if (nombre == undefined || apellido1 == undefined || apellido2 == undefined || ciudad == undefined || categoria == undefined) {
        res.status(400).json({msg: "Es necesario meter todos los datos necesarios (nombre, apellido1, apellido2, ciudad y categoria)"});
    } else {
        let cliente = {
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            ciudad: ciudad,
            categoria: categoria,
        };
        console.log(cliente);
        try {
            const result = await clienteService.createCliente(cliente);
            const idPosicion = result.data.insertId;
            res.status(200).json({msg: "El cliente fue añadido", idPosicion});
        } catch (err) {
            console.error("Error al añadir al cliente ", err.message);
            res.status(500).json({ error: "Error interno al crear el cliente" });
        }
    }
});

// ■■■■■■■4- buscar pedidos del cliente por id
router.get("/buscar/pedidos/:id", async function (req, res) {
    console.log("GET pedido cliente POR ID");
    const id = req.params.id;
    try {
        const result = await clienteService.getPedidosCliente(id);

        if(result.length > 0){
            res.status(200).json(result);
        } else {
            res.sendStatus(404);
        }
    } catch(err) {
        console.error("Error intentando extraer los pedidos del cliente: ", err.message);
        res.status(500).json({ error: "Error interno al obtener los pedidos del cliente" });

    }
});

module.exports = router;
