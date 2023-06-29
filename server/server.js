const express = require("express");
const cors = require("cors");
const fs = require("fs");
const {
  createUsersTable,
  addUser,
  getUsers,
  delUser,
  updateUser,
} = require("./db/users");

const app = express();
const port = 3000;

// Запускаем сервер на порту 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/**CORS */
app.use(cors());
/**express может принимать json*/
app.use(express.json());

/**КОНТРОЛЛЕР COLLECTION start */

/**Получение перечня папок с фото с сортировкой по дате создания */
const collectionsPath = "./src/assets/img/photos/collections/";
app.get("/api/photos", (req, res) => {
  const path = collectionsPath;
  const files = fs.readdirSync(path);
  const folders = files.filter((file) =>
    fs.statSync(`${path}/${file}`).isDirectory()
  );
  folders.sort((a, b) => {
    const aStat = fs.statSync(`${path}/${a}`);
    const bStat = fs.statSync(`${path}/${b}`);
    return bStat.birthtimeMs - aStat.birthtimeMs;
  });
  res.status(200).json(folders);
});

/**Получение колекций фото */
app.get("/api/collection", (req, res) => {
  const collectionName = req.query.collectionName;
  const path = `${collectionsPath}${collectionName}`;
  const files = fs.readdirSync(path);
  res.status(200).json(files);
});

/**КОНТРОЛЛЕР COLLECTION end */

/**КОНТРОЛЛЕР USER start */

// Создание таблицы users
createUsersTable();

app.get("/api/users", async (req, res) => {
  res.status(200).json(await getUsers());
});

app.post("/api/users", (req, res) => {
  const user = req?.body;
  const newUserName = user?.name;
  const newUserPassowd = user?.password;
  addUser(newUserName, newUserPassowd);
});

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = req?.body;
  const newUserName = user?.name;
  const newUserPassowd = user?.password;
  updateUser(newUserName, newUserPassowd, id);
});

app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  await delUser(id);
});

/**КОНТРОЛЛЕР USER end */

module.exports = { app, port };
