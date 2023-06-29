const pool = require("./database");

// метод проверки пароля
async function checkUserAndPassword(name, password) {
  try {
    const query = `SELECT * FROM users WHERE name=$1 AND password=$2;`;
    const values = [name, password];
    const result = await pool.query(query, values);
    return !!result.rows[0];
  } catch (error) {
    return `Ошибка , ${error}`;
  }
}
async function checkUser(name) {
  try {
    const query = `SELECT * FROM users WHERE name=$1;`;
    const values = [name];
    const result = await pool.query(query, values);
    return !!result.rows[0];
  } catch (error) {
    return `Ошибка , ${error}`;
  }
}

module.exports = { checkUserAndPassword, checkUser };
