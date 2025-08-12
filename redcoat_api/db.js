require('dotenv').config();
//DB config
const Pool = require("pg").Pool;

//connect to db on render
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool