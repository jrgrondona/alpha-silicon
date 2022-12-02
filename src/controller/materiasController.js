require("rootpath")();
const express = require('express');
const app = express();

const materiasDB = require("../datasource/materiasDB.js");


app.get('/', getAll);

app.get('/:idmateria', getByidmateria);

app.post('/', create);

app.put('/:idmateria', update);

//app.delete('/del/:idmateria', eliminar);

app.delete('/:idmateria', eliminacionlogica);

// Metododo para listar todas las materias
function getAll(req, res) {
    materiasDB.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar la materia por id
function getByidmateria(req, res) {
    materiasDB.getByidmateria(req.params.idmateria,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar materia
function create(req, res) {
    materiasDB.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar materia
function update(req, res) {
    materiasDB.update(req.params.idmateria, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}
// Metodo par eliminar fisicmente una materia de la base de datos
function eliminar(req, res) {
    materiasDB.delete(req.params.idmateria,  function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.detail.affectedRows == 0) {
                res.status(404).json(result);
            } else {
                res.json(result);
            }
        }
    });
}
// Metodo par eliminar materia cambiando el estado a 0
function eliminacionlogica(req, res) {
    materiasDB.logdelete(req.params.idmateria, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
                res.status(404).json(result);  
        } else if (result.code == 1) {      
            res.json(result);
        }
    });
}

module.exports = app;