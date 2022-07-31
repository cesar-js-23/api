const db = require('./configuracion');

function pedirTodas(tabla,callback){
    db.any(`SELECT * FROM ${tabla} ORDER BY ID `)
        .then(resultado => {
            callback(null, resultado);
        })
        .catch(error => {
            callback(error);
        });
};

function pedir(tabla,id,callback){
    db.any(`SELECT * FROM ${tabla} where id = ${id} `)
        .then(resultado => {
            callback(null, resultado);
        })
        .catch(error => {
            callback(error);
        });
};

function crear (tabla,item,callback){
    const keys = Object.keys(item);
    const propiedades = keys.join(', ');
    const valores = keys.map(key => `'${item[key]}'`).join(', ');
    let query = `INSERT INTO ${tabla} (${propiedades}) VALUES(${valores}`;
    console.log(query)
    db.any(`INSERT INTO ${tabla} (${propiedades}) VALUES(${valores}) returning *`)
        .then(([resultado]) => {
            callback(null, resultado);
        })
        .catch(error => {
            callback(error);
        });

    }

function actualizar(tabla,item,id,callback){
    const keys = Object.keys(item);
    const actualizaciones = keys.map(key => `${key} = '${item[key]}' `).join(', ');
    const sql = `UPDATE ${tabla} SET ${actualizaciones} WHERE id = ${id} returning *`;
    console.log(sql);
    db.any(sql)
        .then(([resultado]) => {
            callback(null, resultado);
        })
        .catch(error => {
            callback(error);
        });    
}

function eliminar(tabla,id,callback){
    const sql = `DELETE FROM ${tabla} WHERE id = ${id} `;
    console.log(sql);
    db.any(sql)
        .then(() => {
            callback(null);
        })
        .catch(error => {
            callback(error);
        });    
}




module.exports = {
    pedirTodas,
    pedir,
    crear,
    actualizar,
    eliminar
};


// DB_USER=postgress DB_PASSWORD=123456789 npm start