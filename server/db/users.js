const pool = require("./database");

// Создание таблицы users
async function createUsersTable() {
  try {
    const query = ` CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )`;
    await pool.query(query);
    console.log("Таблица users создана", pool.query(query));
  } catch (error) {
    console.error("Ошибка при создании таблицы users:", error);
  }
}

// метод получения пользователей
async function getUsers() {
  try {
    const query = `SELECT * FROM users;`;
    const result = await pool.query(query);
    const data={
      nodes:result.rows,
      totalCount:result.rowCount
    }
    return data
  } catch (error) {
    return `Ошибка получения пользователей, ${error} `
  }
}
// Добавление новой записи в таблицу users
async function addUser(name, password) {
  try {
    const query = `INSERT INTO users (name, password)
      VALUES ($1, $2)
      RETURNING *`;
    const values = [name, password];

    const result = await pool.query(query, values);

    return `Новый пользователь добавлен, ${error,result.rows[0]}`
  } catch (error) {
    return `Новый пользователь не добавлен, ${error}`
  }
}
// Изменение записи пользователя ??
async function updateUser(id, name, password) {
  try {
    const query = `UPDATE users SET age = '18' WHERE id = '3'
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [id,name, password];

    const result = await pool.query(query, values);

    return `Новый пользователь добавлен, ${error,result.rows[0]}`
  } catch (error) {
    return `Новый пользователь добавлен, ${error}`
  }
}


// Удаление пользователя ??
async function delUser(id) {
  try {
    const query = `'DELETE FROM users WHERE id = %s', (id) VALUES ($1);`
    const values = [id];
    const result = await pool.query(query, values);
    return `Запись о пользователе удалена:, ${result.rows[0]}`;
  } catch (error) {
    return  `Ошибка при удалении записи:, ${error}`;
  }
}

module.exports = { createUsersTable, addUser,getUsers,delUser };
