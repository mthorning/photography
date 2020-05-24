const fs = require("fs");
const path = require("path");
const resizer = require("node-image-resizer");

const imageSrc = "/home/mthorning/Pictures/website";
const localDest = "./photos/";

const thumbConfig = {
  path: `${localDest}/thumbnails/`,
  width: 250,
  quality: 80,
};

const fullsizeConfig = {
  path: `${localDest}/fullsize/`,
  width: 1920,
  quality: 95,
};

function addIfMissing(file, config, log) {
  fs.access(path.resolve(config.path, file), fs.constants.F_OK, (noFile) => {
    if (noFile) {
      resizer(path.resolve(imageSrc, file), { versions: [config] }).then(() => {
        console.log(`Added ${log} for ${file}`);
      });
    }
  });
}

fs.readdir(imageSrc, (error, files) => {
  if (error) console.error(error);

  files.forEach((file) => {
    addIfMissing(file, thumbConfig, "thumbnail");
    addIfMissing(file, fullsizeConfig, "image");
  });
});
