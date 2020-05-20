const fs = require("fs");
const path = require("path");
const resizer = require("node-image-resizer");

const imageSrc = "/home/mthorning/Pictures/website";

const configs = [
  {
    log: "thumbnail ",
    version: {
      path: "./static/images/thumbnails/",
      width: 1920,
      quality: 95,
    },
  },
  {
    log: "image ",
    version: {
      path: "./static/images/fullsize/",
      width: 250,
      quality: 80,
    },
  },
];

function checkFileExists(file, ifNoFile) {
  return new Promise((resolve) => {
    fs.access(file, fs.constants.F_OK, (noFile) => {
      if (noFile) resolve(ifNoFile);
      resolve({});
    });
  });
}

function findMissingImages(file) {
  return configs.map((config) =>
    checkFileExists(path.resolve(config.version.path, file), config)
  );
}

fs.readdir(imageSrc, (error, files) => {
  if (error) console.error(error);

  files.forEach((file) => {
    Promise.all([...findMissingImages(file)]).then((configs) => {
      const versions = [];
      const logs = [];
      configs.forEach((config) => {
        if (config.version) versions.push(config.version);
        if (config.log) logs.push(config.log);
      });
      if (versions.length) {
        resizer(path.resolve(imageSrc, file), { versions }).then(() => {
          console.log(`Added ${logs.join("and ")}for ${file}`);
        });
      }
    });
  });
});
