const express = require("express");
let ejs = require("ejs");

const app = express();

const users = [
  {
    name: "John",
    age: 25,
    email: "john@example.com",
  },
  {
    name: "Jane",
    age: 30,
    email: "jane@gmail.com",
  },
  {
    name: "Doe",
    age: 35,
    email: "doe@example.com",
  },
];

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (_, res) => res.render("list", { users }));
app.post("/", (req, res) => {
  //   list.push(req.body.text);
  res.render("users", { users });
});

app.listen(8000);
