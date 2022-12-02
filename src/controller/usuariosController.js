require("rootpath")();
const express = require('express');
const app = express();

const usuariosDb = require("../datasource/usuariosDB.js");


app.get('/', getAll);

app.get('/:idusuario', getByidUsuario);

app.post('/', create);

app.put('/:idusuario', update);

//app.delete('/del/:idusuario', eliminar);

app.delete('/:idusuario', eliminacionlogica);

// Metododo para listar todos los usuarios
function getAll(req, res) {
    usuariosDb.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar usuario por su id
function getByidUsuario(req, res) {
    usuariosDb.getByidUsuario(req.params.idusuario,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar usuario
function create(req, res) {
    usuariosDb.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar un usuario
function update(req, res) {
    usuariosDb.update(req.params.idusuario, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}
// Metodo par eliminar fisicmente un usuario de la base de datos
function eliminar(req, res) {
    usuariosDb.delete(req.params.idusuario,  function (err, result) {
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
// Metodo par eliminar usuario cambiando el estado a 0
function eliminacionlogica(req, res) {
    usuariosDb.logdelete(req.params.idusuario, function (result) {
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