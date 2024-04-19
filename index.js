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

app.get("/", (_, res) => res.render("list", { users, error: "" }));
app.post("/", (req, res) => {
  let error = null;
  if (!req.body.name) error = { message: "Name is required" };
  if (!req.body.age) error = { message: "Age is required" };
  if (!req.body.email) error = { message: "Email is required" };
  if (req.body.age < 17) error = { message: "Age must be at least 18" };
  if (req.body.age > 200) error = { message: "Age must be less than 200" };
  if (/^[a-zA-Z\.]+\@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(req.body.email) === false)
    error = { message: "Invalid email" };
  if (!error) users.push(req.body);
  res.render("list", { users, error: error?.message || "" });
});

app.listen(8000);
