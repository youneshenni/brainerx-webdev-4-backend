const express = require("express");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const usersPath = "./users.json";

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

sequelize.sync({ alter: true });

const app = express();

const getUsers = () => User.findAll();

const writeUser = (user) => User.create(user);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", async (_, res) => {
  const users = await getUsers();
  res.render("list", { users, error: "" });
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

app.listen(8000);
