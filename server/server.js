const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");

const { checkUserAndPassword, checkUser } = require("./db/auth");
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

/**КОНТРОЛЛЕР AUTH users */

//проверка уникальности имени пользователя
//проверка логина и поролы

app.post("/api/login", async (req, res) => {
  const user = req?.body;
  console.log("user", user);
  const userName = user?.name;
  const userPassowd = user?.password;
  if (userName && userPassowd) {
    res.status(200).json(await checkUserAndPassword(userName, userPassowd));
    console.log("checkUserAndPassword");
  }
  if (userName && !userPassowd) {
    console.log("checkUser");
    res.status(200).json(await checkUser(userName));
  }
});

/**КОНТРОЛЛЕР AUTH end */

/**КОНТРОЛЛЕР UPLOAD FILES start*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.query.folderName;
    console.log(folderName);

    cb(null, `./src/assets/img/photos/collections/${folderName}`); // указываем папку на сервере для сохранения файлов
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.get("/api/upload", (req, res) => {
  console.log("/api/upload get");
  // отправка файла клиенту
  const fileName = req.params.filename;
  const filePath = "./src/assets/img/photos/collections/" + fileName;
  res.download(filePath);
});

/**КОНТРОЛЛЕР UPLOAD FILES end */

module.exports = { app, port };
