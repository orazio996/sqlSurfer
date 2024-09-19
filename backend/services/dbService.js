const DB = require('mysql')

exports.signup = async(data)=>{    //da rivedere, JWT, sessioni ecc.....

    const connection = DB.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        database: process.env.DB_NAME
    });

    connection.connect();

    const query = `INSERT INTO user (username, password) VALUES (?, ?)`;

    connection.query(query, [data.username, data.password], function (err, results) {
        if (err) throw err;
        console.log('Entry inserita nel Database');
    });

    connection.end();
    return data;
}

exports.signin = async(data)=>{
    //nel controller tramite findUser
}

exports.findUser = async (username)=>{
    const connection = DB.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        database: process.env.DB_NAME
    });

    connection.connect();
    
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM user WHERE username = ?`;

        connection.query(query, [username], (err, results) => {
            if (err) {
                connection.end();
                return reject(err);
            }
            connection.end();
            resolve(results[0]);
        });
    });

}

exports.saveCorrection = async(correction)=>{
    const connection = DB.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        database: process.env.DB_NAME
    });

    
    connection.connect();

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO correction (user_id, query, corrected_query) VALUES (?, ?, ?)`;

        connection.query(query, [correction.user_id, correction.query, correction.correctedQuery.toString()], (err, results) => {
            if (err) {
                connection.end();
                return reject(err);
            }
            connection.end();
            resolve();
        });
    });
}


exports.getCronologia = async function (user_id) {
    const connection = DB.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        database: process.env.DB_NAME
    });

    connection.connect();

    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM correction WHERE user_id = ? ORDER BY timestamp DESC`;

        connection.query(query, [user_id], (err, results) => {
            if (err) {
                connection.end();
                return reject(err);
            }
            connection.end();
            resolve(results);
        });
    });
}

exports.newModel = async(model)=>{

    const connection = DB.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        database: process.env.DB_NAME
    });

    connection.connect();

    const query = `INSERT INTO db_model (name, def, user_id) VALUES (?, ?, ?)`;

    connection.query(query, [model.name, model.def, model.user_id], (err, results, fields) => {
        if (err) {
            throw err;  
        }
        console.log('Entry inserita nel Database', model);
    });

    connection.end();
    return model;
}

exports.getModels = async(user_id)=>{
    const connection = DB.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        database: process.env.DB_NAME
    });

    connection.connect();

    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM db_model WHERE user_id = ? ORDER BY timestamp DESC`;

        connection.query(query, [user_id], (err, results) => {
            if (err) {
                connection.end();  
                return reject(err);  
            }
            connection.end();  
            resolve(results);  
        });
    });
}

