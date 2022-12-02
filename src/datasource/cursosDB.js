const mysql = require('mysql');
const config = require("../config/config.json");

//conectarnos a nuestra DB
var connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("cursosDB Conectada correctamente");
    }
});
//fin de conexion db

var cursosDb = {};


cursosDb.getAll = function (funCallback) {
    connection.query("SELECT * FROM cursos where estado >=1", function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            funCallback(undefined, result);
        }
    });
}

cursosDb.getByidCurso = function (idcurso,funCallback) {
    connection.query("SELECT * FROM cursos WHERE idcurso=?",idcurso, function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if(result.length>0){
                funCallback(undefined, result[0]);
            }else{
                funCallback({
                    message: "No se encontro el curso"
                });
            }
            
        }
    });
}

cursosDb.create = function (cursos, funCallback) {
    var query = 'INSERT INTO cursos (nombre,descripcion) VALUES (?,?)'
    var dbParams = [cursos.nombre, cursos.descripcion];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe el curso ${cursos.nombre}`,
                    detail: err
                });
            }else{
                funCallback({
                    message: "Surgio un problema, contactese con un administrador. Gracias",
                    detail: err
                });
            }
            
            console.error(err);
        } else {
            funCallback(undefined, {
                message: `Se creo el curso ${cursos.nombre} ${cursos.descripcion}`,
                detail: result
            });
        }
    });
}

/**
 * 
 * @param {*} nombre 
 * @param {*} curso 
 * @param {*} funCallback 
 *         retorna:
 *              code = 1 (EXITO)
 *              code = 2 (NOT FOUND) (NO encontro elemento)
 *              code = 3 (ERROR)
 * 
 */
cursosDb.update = function (idcurso, funCallback) {
    var query = 'UPDATE cursos SET idcurso = ?'
    var dbParams = [idcurso];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            funCallback({
                code:3,
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    code:2,
                    message: `No se encontro el curso ${idcurso}`,
                    detail: result
                });
            } else {
                funCallback({
                    code:1,
                    message: `Se modifico el curso ${curso.nombre}`,
                    detail: result
                });
            }
        }
    });

}


//cursosDb.delete = function(idcurso,funCallback){
  //  var query = 'DELETE FROM cursos WHERE idcurso = ?'
    //connection.query(query, idcurso, function (err, result, fields) {
      //  if (err) {
        //    funCallback({
          //      message: "Surgio un problema, contactese con un administrador. Gracias",
            //    detail: err
            //});
            //console.error(err);
        //} else {
          //  if (result.affectedRows == 0) {
            //    funCallback(undefined,{
              //      message: `No se encontro el curso ${idcurso}`,
                //    detail: result
               // });
            //} else {
              //  funCallback(undefined,{
                //    message: `Se elimino el curso ${idcurso}`,
                  //  detail: result
                //});
           // }
        //}
    //});
//}

/**
 * @param {*} cursos
 * @param {*} idcursos
 * @param {*} funCallback
 *         retorna:
 *              code = 1 (EXITO)
 *              code = 2 (NOT FOUND) (NO encontro elemento)
 *              code = 3 (ERROR)
 * 
 */
cursosDb.logdelete = function (idcurso, funCallback) {
    connection.query("UPDATE cursos SET estado = 0 WHERE idcurso = ?",idcurso, function (err, result, fields) {
        if (err) {
            funCallback({
                code:3,
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            }); 
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    code:2,
                    message: `No se encontro el id  ${idcurso} del curso`,
                    detail: result
                }); 
            } else {
         //       console.error(err);
                    funCallback({
                    code:1,
                    message: `Se modifico el curso con el id ${idcurso}`,
                    detail: result
                }); 
            }
        }
    });
}

module.exports = cursosDb;