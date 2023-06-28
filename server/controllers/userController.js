
const { app } = require("../server");


app.get("/api/users", async (req, res) => {
  const r= await getUsers()
  res.status(200).json(r);
});


app.post("/api/users", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  addUser("John", "password123");
  res.status(200).json("test post");
});


app.put("/api/users/:id", (req, res) => {
  res.json("test put");
});


app.delete("/api/users/:id", async (req, res) => {
  const id= req.params.id
  const r= await delUser(id)
  res.json('ответ'+ r);
});



