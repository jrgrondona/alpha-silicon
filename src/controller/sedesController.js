require("rootpath")();
const express = require('express');
// const { getByidSedes } = require("../datasource/sedesDB.js");
const app = express();

const sedesDB = require("../datasource/sedesDB.js");


app.get('/', getAll);

app.get('/:idsede', getByidSedes);

app.post('/', create);

app.put('/:idsede', update);

app.delete('/:idsede', eliminacionlogica);

// Metododo para listar todas las sedes
function getAll(req, res) {
    sedesDB.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar una sede por id
function getByidSedes(req, res) {
    sedesDB.getByidSedes(req.params.idsede,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar sede
function create(req, res) {
    sedesDB.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar sede
function update(req, res) {
    sedesDB.update(req.params.idsede, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}
// Metodo par eliminar sede cambiando el estado a 0
function eliminacionlogica(req, res) {
    sedesDB.logdelete(req.params.idsede, function (result) {
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