const express = require("express");
const router = express.Router();


const comercialService  = require("../services/comercialService");

// ■■■■■■■1- Obtener una lista de todos los comerciales, 
router.get("/",async function (req, res) {
    console.log("GET TODOS");
    try {
        const comercial= await comercialService.getMultiple();
        res.status(200).json(comercial);
    } catch (err){
		console.error("Error intentando extraer los datos de comerciales ", err.message);
		res.status(500).json({ error: "Error interno al obtener los comerciales" });
	}
});

// ■■■■■■■2- Obtener un comercial concreto enviando su ID. 
router.get("/buscar/:id", async function (req, res) {
    console.log("GET ID");
    const id= req.params.id;
    try {
        const result= await comercialService.getOneComercial(id);

        if(result.length>0){
            res.status(200).json(result);
        }else{
            res.sendStatus(404);
        }
    } catch(err){
		console.error("Error intentando extraer los datos del comerciales: ", err.message);
        res.status(500).json({ error: "Error interno al obtener el comerciales" });
    }

});


// ■■■■■■■3- Crear un comercial nuevo. Los datos del comercial (todos menos id y matriculado que será 0 por defecto) se envían en un JSON 
router.post("/crear", async function (req, res) {
    console.log("POST CREAR");
    const {nombre, apellido1, apellido2, comision} = req.body;

    if(nombre==undefined || apellido1==undefined || apellido2==undefined || comision==undefined ){
		res.status(400).json({msg: "Es necesario meter todos los datos necesarios (nombre, localidad, curso y especialidad)"});
    }else{
        let comercial={
            nombre:nombre,
            apellido1:apellido1,
            apellido2:apellido2,
            comision:comision,
        };
        console.log(comercial);
        try {
            const result= await comercialService.createComercial(comercial);
            const idPosicion= result.data.insertId;
            console.log(idPosicion, "+++++++", )

            res.status(200).json({msg: "El comercial fue añadido", idPosicion})
        } catch(err){
			console.error("Error al añadir al comercial ", err.message);
			res.status(500).json({ error: "Error interno al crear el comercial" });
		}


    }


});







//■■■■■■■■■■■■IMPORTANTE■■■■■■■■■■■■■■■■■■
module.exports = router;