const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    // PORT only for development environment
    port: 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'crm',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


module.exports = pool;
