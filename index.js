const express = require("express");
const { request } = require("http");

const app = express();

const list = ["item1", "item2", "item3", "item4"];

app.get("/", (_, res) =>
  res.send(`<ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>`)
);

app.listen(8000);
