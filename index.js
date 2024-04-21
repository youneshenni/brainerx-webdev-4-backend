const express = require("express");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const usersPath = "./users.json";

const app = express();

function initializeUsersFile() {
  writeFileSync(usersPath, "[]");
}

function readUsersFromFile() {
  if (!existsSync(usersPath)) {
    initializeUsersFile();
    return [];
  }
  const data = readFileSync(usersPath);
  try {
    return JSON.parse(data);
  } catch (e) {
    initializeUsersFile();
    return [];
  }
}

function writeToFile(data) {
  writeFileSync(usersPath, JSON.stringify(data, null, 2));
}

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (_, res) => {
  const users = readUsersFromFile();
  res.render("list", { users, error: "" });
});
app.post("/", (req, res) => {
  const users = readUsersFromFile();
  let error = null;
  if (!req.body.name) error = { message: "Name is required" };
  if (!req.body.age) error = { message: "Age is required" };
  if (!req.body.email) error = { message: "Email is required" };
  if (req.body.age < 17) error = { message: "Age must be at least 18" };
  if (req.body.age > 200) error = { message: "Age must be less than 200" };
  if (/^[a-zA-Z\.]+\@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(req.body.email) === false)
    error = { message: "Invalid email" };
  if (!error) {
    users.push(req.body);
    writeToFile(users);
  }
  res.render("list", { users, error: error?.message || "" });
});

app.listen(8000);
