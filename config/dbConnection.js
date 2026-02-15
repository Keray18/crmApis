const pool = require('./dbConfig');


const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL Database connected successfully');
        connection.release();
    } catch (err) {
        console.error('Error connecting to the database: ', err);
        process.exit(1);
    }
}


module.exports = connectDB;