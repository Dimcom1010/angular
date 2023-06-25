const express = require('express');
const cors = require("cors");
const fs = require('fs');

const app = express();
const port = 3000;

const collectionsPath='./src/assets/img/photos/collections/'

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/photos', (req, res) => {
  const path = collectionsPath;
  const files = fs.readdirSync(path);
  const folders = files.filter(file => fs.statSync(`${path}/${file}`).isDirectory());
  folders.sort((a, b) => {
    const aStat = fs.statSync(`${path}/${a}`);
    const bStat = fs.statSync(`${path}/${b}`);
    return bStat.birthtimeMs - aStat.birthtimeMs;
  });
  res.json(folders);
});


app.get('/api/collection', (req, res) => {
  const collectionName=req.query.collectionName
  const path = `${collectionsPath}${collectionName}`;
  const files = fs.readdirSync(path);
  res.json(files);
});


// Запускаем сервер на порту 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
