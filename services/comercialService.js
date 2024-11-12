const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const { json } = require('body-parser');

// ■■■■■■■■ getMultiple ■■■■■■■■  Obtener una lista de todos los alumnos, 
async function getMultiple(page = 1){
    
    const rows = await db.query(`SELECT * FROM comercial`);
    
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
  }

  // ■■■■■■■■ getOneComercial ■■■■■■■■  un alumno concreto enviando su ID. 
async function getOneComercial(id) {
                         
    const rows = await db.query('SELECT * FROM comercial WHERE id=' + id + ';');

    const data = helper.emptyOrRows(rows);

    return data;
}

// ■■■■■■■■ createComercial ■■■■■■■■ un alumno nuevo. Los datos del alumno (todos menos id y matriculado que será 0 por defecto) se envían en un JSON
async function createComercial(comercial) {
    
    let sql = "INSERT INTO `comercial` (`nombre`, `apellido1`, `apellido2`, `comision`) VALUES (";
    sql += "'"+comercial.nombre+
          "','"+comercial.apellido1+
          "','"+comercial.apellido2+
          "','"+comercial.comision+"'";
    sql+= ");";
  
    
    const rows = await db.query(sql);
  
    const data = helper.emptyOrRows(rows);
    return { data };
  
  }


module.exports = {
    getMultiple,
    getOneComercial,
    createComercial,
    //---- hecho hasta aqui
  }