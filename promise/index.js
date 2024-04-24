const { existsSync, mkdirSync, writeFileSync, mkdir } = require("fs");

const files = [
  "folder1/folder2/folder3/file.txt",
  "folder1/folder4/folder5/file.txt",
  "folder1/folder1/folder6/file.txt",
];

for (let i = 0; i < files.length; i++) {
  const currentPath = files[i];
  const folders = currentPath.split("/").slice(0, -1);
  let path = "";
  for (let j = 0; j < folders.length; j++) {
    path += folders[j] + "/";
    if (!existsSync(path)) {
      mkdirSync(path);
    }
  }
  writeFileSync(currentPath, "");
}
