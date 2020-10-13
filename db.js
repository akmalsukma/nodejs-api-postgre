const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "123",
    database: "db_sekolah",
    host: "localhost",
    port: 5432
});

module.exports = pool;