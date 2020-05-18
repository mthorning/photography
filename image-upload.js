const fs = require("fs");
const path = require("path");
const resizer = require("node-image-resizer");

const imageSrc = "./src-images";

const resizeConfig = {
  all: {
    quality: 80,
  },
  versions: [
    {
      path: "./static/images/fullsize/",
      width: 1920,
      quality: 95,
    },
    {
      path: "./static/images/thumbnails/",
      width: 250,
    },
  ],
};

fs.readdir(imageSrc, (error, files) => {
  if (error) console.error(error);
  files.forEach(async (file) => {
    await resizer(path.resolve(imageSrc, file), resizeConfig);
    console.log("resized ", file);
  });
});
