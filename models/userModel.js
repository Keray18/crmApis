const pool = require('../config/dbConfig');


const User = {
    async create({ name, email, password}) {
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
            [name, email, password]
        );
        return result;
    },
    async findByEmail(email) {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return rows[0] || null;
    },
    async findById(id) {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        return rows[0] || null;
    },
    async getAll() {
        const [rows] = await pool.execute(
            "SELECT id, email FROM users");
            return rows;
    }
};

module.exports = User;