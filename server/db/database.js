const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "test1",
});
module.exports = pool;
