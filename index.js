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

app.use(express.json());

app.set("view engine", "ejs");

app.use(cookieParser());

app.get("/", async (req, res) => {
  res.render("list");
});

app.get("/login", (_, res) => {
  res.render("login");
});

app.get("/register", (_, res) => {
  res.render("register");
});

app.post("/", async (req, res) => {
  if (!req.body.username) return res.status(400).send("username is required");
  if (!req.body.password) return res.status(400).send("Password is required");
  try {
    await writeUser(req.body);
    return res.status(201).send("Created");
  } catch (e) {
    if (e.errors[0].message === "email must be unique") {
      return res.status(409).send("User already exists");
    } else {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
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
    res.status(201).send("Created");
  } else {
    res.send("Wrong password");
  }
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(8000);
