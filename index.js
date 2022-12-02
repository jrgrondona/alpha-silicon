require("rootpath")();
const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require("./src/config/config.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');
  


app.get("/", function (req, res) {
    res.send("ALPHA-SILICON");
});
const usuariosCont = require("./src/controller/usuariosController.js");
app.use("/api/usuarios",usuariosCont);

const cursosCont = require("./src/controller/cursosController.js");
app.use("/api/cursos",cursosCont);

const personaCont = require("./src/controller/personaController.js");
app.use("/api/persona",personaCont);

const materiasCont = require("./src/controller/materiasController.js");
app.use("/api/materias",materiasCont);

const sedesCont = require("./src/controller/sedesController.js");
app.use("/api/sedes",sedesCont);
/*
const userCont = require("userController.js");
app.use("/api/usuario",userCont);
*/

app.listen(config.server.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server iniciado en puerto:${config.server.port}`);
    }
});
