const { mkdir, stat, writeFile } = require("fs/promises");
const { join } = require("path");

const files = [
  "folder1/folder2/folder3/file.txt",
  "folder1/folder4/folder5/file.txt",
  "folder1/folder1/folder6/file.txt",
];

const createRecursiveFolders = async (path, acc = "") => {
  await stat(join(acc, path[0])).catch((err) => {
    if (err.code === "ENOENT") return mkdir(join(acc, path[0]));
  });
  if (path.length > 1)
    return createRecursiveFolders(path.slice(1), join(acc, path[0]));
};

Promise.all(
  files
    .map((file) => file.split("/").slice(0, -1))
    .map((result) => createRecursiveFolders(result))
).then(files.map((file) => writeFile(file, "Hello world!")));
