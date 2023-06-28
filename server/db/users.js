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

// Добавление новой записи в таблицу users
async function addUser(name, password) {
  try {
    const query = `INSERT INTO users (name, password)
      VALUES ($1, $2)
      RETURNING *`;
    const values = [name, password];
    const result = await pool.query(query, values);
    console.log("Новая запись добавлена:", result.rows[0]);
  } catch (error) {
    console.error("Ошибка при добавлении записи:", error);
  }
}

module.exports = { createUsersTable, addUser };
