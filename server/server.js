const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { createUsersTable, addUser, getUsers,delUser } = require("./db/users");

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


// app.get("/api/users", async (req, res) => {
//   const r= await getUsers()
//   res.status(200).json(r);
// });


// app.post("/api/users", (req, res) => {
//   console.log(req.query);
//   console.log(req.body);
//   addUser("John", "password123");
//   res.status(200).json("test post");
// });


// app.put("/api/users/:id", (req, res) => {
//   res.json("test put");
// });


// app.delete("/api/users/:id", async (req, res) => {
//   const id= req.params.id
//   const r= await delUser(id)
//   res.json('ответ'+ r);
// });


// Создание таблицы users
createUsersTable();

module.exports = { app,port };
