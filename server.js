const mysql = require('mysql2/promise');

const credentials = {
    user: "root",
    password: "user",
    host: "localhost",
    database: "users",
    port: 3306
};

async function connect() {
    const connection = await mysql.createConnection(credentials);
    console.log("Conectou no MySQL!");
    return connection;
}


async function getUsers() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM users;');
    return rows;
}

async function postUser(username) {
    const conn = await connect();
    const [rows] = await conn.query(`INSERT INTO Users (username) VALUES ('${username}');`);
    return rows;
}

module.exports = { getUsers, postUser }

