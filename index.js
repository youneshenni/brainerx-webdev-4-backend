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

const getUsers = () => User.findAll();

const writeUser = (user) => User.create(user);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(cookieParser());

app.get("/", async (req, res) => {
  const token = req.cookies.token;
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
  if (!req.body.username) error = { message: "Name is required" };
  if (!req.body.password) error = { message: "Password is required" };
  if (!error) {
    try {
      await writeUser(req.body);
    } catch (e) {
      if (e.errors[0].message === "email must be unique") {
        error = { message: "Email already exists" };
      } else {
        console.error(error);
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
    res.cookie("token", token);
    res.redirect("/");
  } else {
    res.send("Wrong password");
  }
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(8000);
