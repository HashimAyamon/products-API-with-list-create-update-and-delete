const { Pool } = require("pg");

const pool = new Pool({
  user: "class-work",
  password: "batch4",
  host: "localhost",
  port: 5432,
  database: "classWork",
});

pool.connect()
  .then(() => console.log(" PostgreSQL connected successfully"))
  .catch((err) => console.error(" PostgreSQL Connection Error:", err));

module.exports = pool;
