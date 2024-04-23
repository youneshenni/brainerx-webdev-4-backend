const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Sequelize, DataTypes } = require("sequelize");
const cookieParser = require("cookie-parser");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync({ alter: true });

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("view engine", "ejs");

app.use(cookieParser());

app.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.redirect("/login");
  jwt.verify(token, "brainerx", async (err, decoded) => {
    if (err) return res.redirect("/login");
    const users = await User.findAll();
    res.render("list", { users, error: "" });
  });
});

app.get("/login", (_, res) => {
  res.render("login", { error: "" });
});

app.get("/register", (_, res) => {
  res.render("register", { error: "" });
});

app.post("/", async (req, res) => {
  let error = null;
  if (!req.body.name) error = { message: "Name is required" };
  if (!req.body.age) error = { message: "Age is required" };
  if (!req.body.email) error = { message: "Email is required" };
  if (req.body.age < 17) error = { message: "Age must be at least 18" };
  if (req.body.age > 200) error = { message: "Age must be less than 200" };
  if (/^[a-zA-Z\.]+\@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(req.body.email) === false)
    error = { message: "Invalid email" };
  if (!error) {
    try {
      await writeUser(req.body);
    } catch (e) {
      if (e.errors[0].message === "email must be unique") {
        error = { message: "Email already exists" };
      } else {
        error = { message: "Unknown error" };
      }
    }
  }
  const users = await getUsers();
  res.render("list", { users, error: error?.message || "" });
});

app.post("/register", async (req, res) => {
  let error = null;
  if (!req.body.username) error = { message: "Name is required" };
  if (!req.body.password) error = { message: "Password is required" };
  if (!error) {
    try {
      await User.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      res.redirect("/login");
    } catch (e) {
      error = { message: e.message };
    }
  }
  res.render("register", { error: error?.message || "" });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;

  console.log(username);
  const foundUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!foundUser) return res.status(404).send("User not found");

  const passwordMatch = bcrypt.compareSync(
    req.body.password,
    foundUser.password
  );

  if (passwordMatch) {
    const token = jwt.sign({ username: foundUser.username }, "brainerx");
    res.json({ token });
  } else {
    res.send("Wrong password");
  }
});

app.listen(8000);
