const fs = require("fs");

const fileContent = fs.readFileSync("./users.json");

console.log(JSON.parse(fileContent));

const x = [
  {
    name: "John",
    age: 25,
    email: "",
  },
];

fs.writeFileSync("./users.json", JSON.stringify(x, null, 2));
