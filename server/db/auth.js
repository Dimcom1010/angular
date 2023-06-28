const pool = require("./database");



// метод проверки пароля
async function checkUserAndPassword(name, password) {
  try {
    const query = `'SELECT * FROM users WHERE name=%s AND password=%s',  (name, password)
      VALUES ($1, $2)
      RETURNING *`;
    const values = [name, password];

    const result = await pool.query(query, values);

    return `пользователь с совпавшем пололем, ${error,result.rows[0]}`
  } catch (error) {
    return `Ошибка , ${error}`
  }
}

module.exports = { checkUserAndPassword };
