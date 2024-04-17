const express = require("express");
let ejs = require("ejs");

const app = express();

const list = ["item1", "item2", "item3", "item4"];

app.set("view engine", "ejs");

app.get("/", (_, res) => res.render("list", { list }));

app.listen(8000);
