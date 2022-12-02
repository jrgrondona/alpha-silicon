require("rootpath")();
const express = require('express');
const app = express();

const cursosDb = require("../datasource/cursosDB.js");


app.get('/', getAll);

app.get('/:idcurso', getByidCurso);

app.post('/', create);

app.put('/:idcurso', update);

//app.delete('/del/:idcurso', eliminar);

app.delete('/:idcurso', eliminacionlogica);

// Metododo para listar todos los cursos
function getAll(req, res) {
    cursosDb.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar curso por su id
function getByidCurso(req, res) {
    cursosDb.getByidCurso(req.params.idcurso,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar curso
function create(req, res) {
    cursosDb.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar curso
function update(req, res) {
    cursosDb.update(req.params.idcurso, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}
// Metodo par eliminar fisicmente un curso de la base de datos
function eliminar(req, res) {
    cursosDb.delete(req.params.idcurso,  function (err, result) {
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
// Metodo par eliminar curso cambiando el estado a 0
function eliminacionlogica(req, res) {
    cursosDb.logdelete(req.params.idcurso, function (result) {
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